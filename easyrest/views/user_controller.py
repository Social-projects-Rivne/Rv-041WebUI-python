"""This module describe user controller
This module describes behavior of /sign_up route
This module describes behavior of /users/{role_id} route
"""

from pyramid.view import view_config
from pyramid.httpexceptions import HTTPForbidden
from pyramid.httpexceptions import HTTPNotFound
from sqlalchemy.exc import IntegrityError

from ..scripts.json_helpers import wrap
from ..models.validator import check_action_access
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
