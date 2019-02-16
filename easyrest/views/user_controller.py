"""This module describe user controller
This module describes behavior of /sign_up route
"""

import logging

from pyramid.view import view_config
from pyramid.httpexceptions import HTTPForbidden
from pyramid.httpexceptions import HTTPNotFound
from sqlalchemy.exc import IntegrityError

from ..scripts.json_helpers import wrap
from ..models.validator import check_action_access
from ..exceptions import ValidationError
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
    log = logging.getLogger(__name__)
    try:
        current_user = request.token.user
    except AttributeError as ae:
        log.error(ae.message)
        raise HTTPForbidden('Need token for access')

    derivable_role_id = int(request.matchdict['role_id'])
    role = request.dbsession.query(UserRole).get(derivable_role_id)
    if role is None:
        raise HTTPNotFound(request.path)
    check_action_access(current_user.role.name, foreign_role=role.name, action='read')
    users_list = [user.as_dict(exclude=['role_id', 'password']) for user in
                  request.dbsession.query(User).filter_by(role_id=derivable_role_id).order_by(User.name).all()]

    return wrap(users_list, success=True, message='Users with role \'{}\''.format(role.name))


@view_config(route_name='user_create', renderer='json', request_method='POST')
def create_user(request):
    """This function is intended to create a user with a specific role.

       This function processes the route /user/{role_id:\d+}
       and tries to create a user depending on the identifier
       that is extracted from the parameter {role_id}.

    :param request: POST request
    :return: If incorrect json:
                {
                  "message": null,
                  "data": [],
                  "success": false,
                  "error": "Incorrect json format"
                }
             If validation errors:
                {
                  "message": null,
                  "data": [],
                  "success": false,
                  "error": "validation_errors"
                }
             If user created successfully:
                {
                  "message": "User successfully added",
                  "data": [],
                  "success": true,
                  "error": null
                }
    :raise HTTPNotFound: If user role id not found.
    :raise HTTPForbidden: If if an authorization is needed to perform an action.
    """
    log = logging.getLogger(__name__)

    try:
        form_data = request.json_body
    except ValueError as ve:
        log.error(ve.message)
        return wrap([], success=False, error='Incorrect json format')

    database = request.dbsession
    new_user_role = int(request.matchdict['role_id'])
    role = database.query(UserRole).get(new_user_role)
    if role is None:
        log.error('Role id {} not found'.format(new_user_role))
        raise HTTPNotFound(request.path)

    if new_user_role == User.CLIENT:
        try:
            User.add(database, form_data)
        except ValidationError as ve:
            return wrap([], success=False, error=str(ve))
        else:
            return wrap([], success=True, message='User successfully added')

    try:
        current_user = request.token.user
    except AttributeError as ae:
        log.error(ae.message)
        raise HTTPForbidden('Need token for access')

    new_user_role_name = role.name
    check_action_access(current_user.role.name, foreign_role=new_user_role_name, action='create')
    try:
        User.add(database, form_data, role=new_user_role)
    except ValidationError as ve:
        return wrap([], success=False, error=str(ve))
    else:
        return wrap([], success=True, message='User successfully added')
