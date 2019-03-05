"""
This module describe getting, approving/disapproving of unapproved restaurants by Moderator,
This module describes behavior of "user_restaurants" route
"""

from pyramid.view import view_config

from ..auth import restrict_access
from ..models.restaurant import Restaurant
from ..scripts.json_helpers import wrap


@view_config(
    route_name='delete_restaurant',
    renderer='json',
    request_method='PUT'
)
@restrict_access(user_types=["Owner"])
def owner_toggle_restaurant_status(request):
    """
    PUT request controller to handle restaurant delete by owner
    Args:
        request: current pyramid request
    Returns:
        Json string(not pretty) created from dictionary with format:
            {
                "data": Null,
                "success": success,
                "error": error
            }
        If user is unauthorized and not an admin - throw 403:
    """
    restaurant_data = request.json_body
    restaurant_id = restaurant_data["id"]
    restaurant_status = restaurant_data["status"]
    db_session = request.dbsession
    try:
        restaurant = db_session.query(Restaurant).get(int(restaurant_id))
        restaurant.status = restaurant_status
    except:
        return wrap(success=False, error="Restaurant delete failure")
    return wrap(success=True)
