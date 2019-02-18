"""This module describe user controller
This module describes behavior of /sign_up route
This module describes behavior of /users/{role_id} route
"""

import logging

from pyramid.view import view_config
from pyramid.httpexceptions import HTTPForbidden
from pyramid.httpexceptions import HTTPNotFound
from sqlalchemy.exc import IntegrityError

from ..scripts.json_helpers import wrap
from ..models.validator import check_action_access
from ..models.validator import check_json_format
from ..exceptions import ValidationError
from ..auth import restrict_access
from ..models.user_role import UserRole
from ..models.user import User


@view_config(route_name='sign_up', renderer='json', request_method='POST')
def sign_up(request):
    """Function for user registration.

    This function processes the route /sign_up and tries to write user data to the database.

    - **parameters**, **return**::

        :param request: POST request with json
                            {
                                "name": (str),
                                "email": (str),
                                "password": (str)
                            }
        :return: If the user is successfully added:
                    {
                        "message": null,
                        "data": [],
                        "success": true,
                        "error": null
                    }

                 If errors:
                    {
                        "message": null,
                        "data": [],
                        "success": false,
                        "error": null
                    }

    """
    form_data = request.json_body
    database = request.dbsession
    try:
        User.add(database, form_data)
        database.flush()
        return wrap([], success=True)
    except IntegrityError:
        database.rollback()
        raise HTTPForbidden("User already exists!")


@view_config(route_name='users_list', renderer='json', request_method='GET')
@restrict_access(['Administrator', 'Owner', 'Moderator', 'Admin'])
def get_users_list(request):
    """This function is intended to display a list of users
    depending on the role id.

    This function processes the route /users/{role_id}
    and tries to create a list of users depending on the identifier
    that is extracted from the parameter {role_id}.

    :param request: GET request
    :raise HTTPForbidden: If the token is not found
    :return: Users list, if the user is allowed to view users with the specified role:
             {
               "message": "Users with role 'role_name'",
               "data": [
                 {
                   "phone_number": "user_phone_number",
                   "name": "user_name",
                   "is_active": is_active_state,
                   "id": user_id,
                   "birth_date": "user_birth_date",
                   "email": "user_email"
                 }
               ],
               "success": true,
               "error": null
             }

             If the user is not allowed to view the list of users with the specified role:
               {
                 "message": null,
                 "data": [],
                 "success": false,
                 "error": "Action not allowed"
               }
    """
    derivable_role_id = int(request.matchdict['role_id'])
    role = request.dbsession.query(UserRole).get(derivable_role_id)
    if role is None:
        raise HTTPNotFound(request.path)
    current_user = request.token.user
    check_action_access(current_user.role.name, foreign_role=role.name, action='read')
    users_list = [user.as_dict(exclude=['role_id', 'password']) for user in
                  request.dbsession.query(User).filter_by(role_id=derivable_role_id).order_by(User.name).all()]

    return wrap(users_list, success=True, message="Users with role '{}'".format(role.name))


@view_config(route_name='user_update', renderer='json', request_method='PUT')
@restrict_access(['Client', 'Waiter', 'Administrator', 'Owner', 'Moderator', 'Admin'])
def update_user(request):
    """This function is intended to update a user with a specific id.

    This function processes the route /user/{user_id:\d+}
    and tries to update a user depending on the identifier
    that is extracted from the parameter {user_id}.

    :param request: PUT request
    :return: The result of an attempt to update.
    :raise HTTPNotFound: If user role id not found.
    """
    log = logging.getLogger(__name__)

    check_json_format(request)

    database = request.dbsession
    requested_user_id = int(request.matchdict['user_id'])
    updated_user = database.query(User).get(requested_user_id)
    if updated_user is None:
        log.error('User id {} not found'.format(requested_user_id))
        raise HTTPNotFound(request.path)

    form_data = request.json_body
    current_user = request.token.user
    if current_user.id == requested_user_id:
        return attempt_update_user(database, updated_user, form_data)
    check_action_access(current_user.role.name, foreign_role=updated_user.role.name, action='update')

    return attempt_update_user(database, updated_user, form_data)


def attempt_update_user(database, updated_user, form_data):
    """This function attempts to update the user in the database.

    The function invoke the model method `update` which updates the user data.

    :param database: Database session.
    :param updated_user: Instance of updated user.
    :param (dict) form_data: JSON-decoded variant of the form inputs.
    :return: If validation errors:
                {
                  "message": null,
                  "data": [],
                  "success": false,
                  "error": "validation_errors"
                }
             If user created successfully:
                {
                  "message": "User successfully updated",
                  "data": [],
                  "success": true,
                  "error": null
                }
    """
    try:
        User.update(database, updated_user, form_data)
    except ValidationError as ve:
        return wrap([], success=False, error=str(ve))
    else:
        return wrap([], success=True, message='User successfully updated')
