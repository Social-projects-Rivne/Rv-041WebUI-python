"""
This module describe getting, approving/disapproving of unapproved restaurants by Moderator,
This module describe getting, banning/unbanning users and owners by Moderator,
This module describes behavior of "moderator/restaurants", "moderator/users" and "moderator/owners" routes
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
        keys = ("id", "status", "creation_date", "name", "address_id", "phone", "owner_id")
        data = []
        for restaurant in unapproved_restaurants:
            restaurant_data = form_dict(restaurant, keys)
            restaurant_data["owner_name"] = restaurant.user.name
            data.append(restaurant_data)
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
    user_status = 1
    users =\
        request.dbsession.query(User).filter(User.role_id == user_status).all()
    if users:
        keys = ("id", "is_active", "name", "phone_number", "email", "birth_date")
        data = []
        for user in users:
            user_data = form_dict(user, keys, True)
            user_data["status"] = user_status
            data.append(user_data)
        wrap_data = wrap(data)
    else:
        wrap_data = wrap([])
    return wrap_data


@view_config(route_name='moderator_get_owners', renderer='json', request_method='GET')
@restrict_access(user_types=["Moderator"])
def get_owners_controller(request):
    """
    GET owner controller to return information about owners for moderator
    Args:
        request: current pyramid request
    Returns:
        Json string(not pretty) created from dictionary with format:
            {
                "data": data,
                "success": success,
                "error": error
            }
        Where data is list with owners, presented in database.
        Style:
            [owner
                {
                }
            ]
        If user is unauthorized and not an admin - throw 403:
    """
    user_status = 2
    users =\
        request.dbsession.query(User).filter(User.role_id == user_status).all()
    if users:
        keys = ("id", "is_active", "name", "phone_number", "email", "birth_date", "restaurants")
        data = []
        for user in users:
            user_data = form_dict(user, keys, True)
            user_data["status"] = user_status
            user_data["restaurants"] = [restaurant.name for restaurant in user.restaurants]
            data.append(user_data)
        wrap_data = wrap(data)
    else:
        wrap_data = wrap([])
    return wrap_data


@view_config(route_name='moderator_manage_users', renderer='json', request_method='POST')
@restrict_access(user_types=["Moderator"])
def manage_users_controller(request):
    """
    POST request controller to handle user activity changing by moderator
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
    data = request.json_body
    user_id = data["id"]
    db_session = request.dbsession
    try:
        user = db_session.query(User).get(int(user_id))
        user.is_active = not user.is_active
    except:
        return wrap(success=False, error="User activity change failure")
    return wrap(success=True)


@view_config(route_name='moderator_manage_owners', renderer='json', request_method='POST')
@restrict_access(user_types=["Moderator"])
def manage_owners_controller(request):
    """
    POST request controller to handle owner activity changing by moderator
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
    data = request.json_body
    owner_id = data["id"]
    db_session = request.dbsession
    try:
        user = db_session.query(User).get(int(owner_id))
        user.is_active = not user.is_active
    except:
        return wrap(success=False, error="Owner activity change failure")
    return wrap(success=True)
