"""
This module describe getting, approving/disapproving of unapproved restaurants by Moderator,
This module describes behavior of "user_restaurants" route
"""

from pyramid.view import view_config

from ..auth import restrict_access
from ..models.restaurant import Restaurant
from ..models.user import User
from ..scripts.json_helpers import wrap
from ..scripts.json_helpers import form_dict


@view_config(route_name='authorize_moderator', renderer='json', request_method='GET')
@restrict_access(user_types=["Moderator"])
def authorize_moderator_controller(request):
    """
    GET request controller to check if user was logged in as Moderator
    Args:
        request: current pyramid request
    Returns:
        Json string(not pretty) created from dictionary with format:
            {
                "data": None,
                "success": True,
                "error": error
            }
    """
    return wrap()


@view_config(route_name='moderator_get_restaurants', renderer='json', request_method='GET')
@restrict_access(user_types=["Moderator"])
def get_restaurants_controller(request):
    """
    GET request controller to return information about restaurants for moderator
    Args:
        request: current pyramid request
    Returns:
        Json string(not pretty) created from dictionary with format:
            {
                "data": data,
                "success": success,
                "error": error
            }
        Where data is list with unapproved restaurants, presented in database.
        Style:
            [restaurant
                {
                }
            ]
        If user is unauthorized and not an admin - throw 403:
    """

    unapproved_restaurants =\
        request.dbsession.query(Restaurant).all()
    if unapproved_restaurants:
        keys = ["id", "status", "creation_date", "name", "address_id", "phone", "owner_id", "owner_name"]
        data = []
        for restaurant in unapproved_restaurants:
            restaurant_data = [
                restaurant.id,
                restaurant.status,
                restaurant.creation_date,
                restaurant.name,
                restaurant.address_id,
                restaurant.phone,
                restaurant.owner_id,
                restaurant.user.name
            ]
            data.append(form_dict(restaurant_data, keys))
        wrap_data = wrap(data)
    else:
        wrap_data = wrap([])
    return wrap_data


@view_config(route_name='moderator_manage_restaurants', renderer='json', request_method='POST')
@restrict_access(user_types=["Moderator"])
def approve_restaurant_controller(request):
    """
    POST request controller to handle restaurant approvement or reverting approval by moderator
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
        return wrap(success=False, error="Restaurant update failure")
    return wrap(success=True)


@view_config(route_name='moderator_manage_restaurants', renderer='json', request_method='DELETE')
@restrict_access(user_types=["Moderator"])
def disapprove_restaurant_controller(request):
    """
    DELETE request controller to handle restaurant disapprovement by moderator
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
    db_session = request.dbsession
    try:
        restaurant = db_session.query(Restaurant).get(int(restaurant_id))
        restaurant.status = 2
    except:
        return wrap(success=False, error="Restaurant archivation failure")
    return wrap(success=True)


@view_config(route_name='moderator_get_users', renderer='json', request_method='GET')
@restrict_access(user_types=["Moderator"])
def get_users_controller(request):
    """
    GET user controller to return information about users for moderator
    Args:
        request: current pyramid request
    Returns:
        Json string(not pretty) created from dictionary with format:
            {
                "data": data,
                "success": success,
                "error": error
            }
        Where data is list with users, presented in database.
        Style:
            [user
                {
                }
            ]
        If user is unauthorized and not an admin - throw 403:
    """
    # user_status = request.headers["User-Status"]
    user_status = 1

    users =\
        request.dbsession.query(User).filter(User.status_id == user_status).all()
    if users:
        keys = ["id", "status", "name", "phone_number", "email", "birth_date"]
        data = []
        for user in users:
            user_data = [
                user.id,
                user_status,
                user.name,
                user.phone_number,
                user.email,
                user.birth_date
            ]
            data.append(form_dict(user_data, keys))
        wrap_data = wrap(data)
    else:
        wrap_data = wrap([])
    return wrap_data


