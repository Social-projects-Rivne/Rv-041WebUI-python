"""
This module describe user personal info controller
This module describes behavior of "/profile" route
"""

from pyramid.httpexceptions import HTTPForbidden
from pyramid.view import view_config

from ..models.user import User
from ..scripts.json_helpers import wrap, date_time_normalize


@view_config(route_name='get_user_info', renderer='json', request_method='GET')
def get_user_info_controller(request):
    """
    GET request controller to return user profile information
    Args:
        request: current pyramid request
    Returns:
        Json string(not pretty) created from dictionary with format:
            {
                "data": data,
                "success": success,
                "error": error
            }
        Where data is list with user info, presented in database.
        (One item in a list)
        Style:
            [restaurant
                {
                }
            ]
        If user is unauthorized - throw 403:
    """
    # in this place must be user authorization status check
    # but now is simple User with Id = 1
    user_id = 1
    user = request.dbsession.query(User).get(user_id)
    # debug (will replace when authorization will be done
    # user = None
    if user is None:
        raise HTTPForbidden("403")
    else:
        user_dict = user.as_dict()
        user_dict = {key: date_time_normalize(value) for key, value in user_dict.items()}
        body = wrap([user_dict])
    return body
