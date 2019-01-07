"""
This module describe user personal info controller
This module describes behavior of "/profile" route
"""

import json
from pyramid.httpexceptions import HTTPNotFound
from pyramid.response import Response
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
        Where data is list with restaurant with tags assigned.
        (One item in a list)
        Style:
            [
                {
                }
            ]
        If user is unauthorized - redirect to authorization page:
    """
    # in this place must be user authorization status check
    # but now is simple User with Id = 1
    user_id = 1
    user = request.dbsession.query(User).get(user_id)
    if user is None:
        raise HTTPNotFound("User not found")
    else:
        user_dict = user.as_dict()
        user_dict = {key: date_time_normalize(value) for key, value in user_dict.items()}
        body = wrap([user_dict])
    return body
