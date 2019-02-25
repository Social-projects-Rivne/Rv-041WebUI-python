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
from ..auth import restrict_access
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


@view_config(route_name='toggle_activity', renderer='json', request_method='GET')
@restrict_access(['Administrator', 'Owner', 'Moderator', 'Admin'])
def toggle_activity(request):
    """This function is intended to toggle the activity status of a user with a specific id.

    This function processes the route user/toggle_activity/{user_id:\d+}
    and toggle the activity status of a user depending on the identifier
    that is extracted from the parameter {user_id}.

    :param request: GET request.
    :return: If user activity changed successfully:
                {
                  "message": "Activity status successfully changed",
                  "data": [],
                  "success": true,
                  "error": null
                }
    :raise HTTPNotFound: If user id not found.
    """
    log = logging.getLogger(__name__)

    requested_user_id = int(request.matchdict['user_id'])
    database = request.dbsession
    requested_user = database.query(User).get(requested_user_id)
    if requested_user is None:
        log.error('User id {} not found'.format(requested_user_id))
        raise HTTPNotFound(request.path)

    current_user = request.token.user
    check_action_access(current_user.role.name, foreign_role=requested_user.role.name, action='toggle_activity')

    requested_user.toggle_activity()
    return wrap([], success=True, message='Activity status successfully changed')
