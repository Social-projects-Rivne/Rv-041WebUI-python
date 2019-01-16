"""
This module describe user personal info controller
This module describes behavior of "/profile" route
"""

from pyramid.view import view_config

from ..scripts.json_helpers import wrap
from ..auth import restrict_access


@view_config(route_name='get_user_info', renderer='json', request_method='GET')
@restrict_access(user_types=["Client", "Owner"])
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

    user = request.token.user
    user_dict = user.as_dict()
    body = wrap(user_dict)
    return body
