"""This module describe menu controler
This module describes behavior of /restaurant/{id} and
/restaurant routes
"""

from pyramid.view import view_config
from pyramid.response import Response
from pyramid.httpexceptions import HTTPNotFound

from ..scripts.json_helpers import wrap
from ..models.restaurant import Restaurant
from ..models.tag import Tag
from ..auth import restrict_access


def asign_tags(rests):
    """Function for assigning all tags related for each restaurant
    into restaurant dictionary for later conversion to json
    Args:
        rests (list): list of restaurants models returned by the query
    Returns:
        List of dictionares in format:
            [
                {
                    [<restaurant key:value>, ]
                    "tags": [<tag dictionary>, ]
                },
            ]
    """
    rests_list = []
    for rest in rests:
        tags = rest.tag
        tags_list = [tag.as_dict() for tag in tags]
        rest_dict = rest.as_dict()
        rest_dict.update({"tags": tags_list})
        rests_list.append(rest_dict)
    return rests_list


@view_config(
    route_name='get_all_restaurants',
    renderer='json',
    request_method='GET'
)
def get_all_restaurant_controler(request):
    """GET request controler to return all restaurants and
    its tags
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
        Style:
            [
                {
                    "id": "restaurantId" + id,
                    "name": (str),
                    "description": (str),
                    "addres_id": curently str,
                    "owner_id": (int),
                    "menu_id": (int)
                    "tags": [{
                        "id": "tagId" + id
                        "name": tag name
                        "priority": (int)
                    }, ]
                },
            ]
    """
    rests = request.dbsession.query(Restaurant).all()
    rests_dict = asign_tags(rests)
    if not rests_dict:
        raise HTTPNotFound("No restaurants in database")
    else:
        body = wrap(rests_dict)

    return body


@view_config(
    route_name='get_restaurant',
    renderer='json',
    request_method='GET'
)
def get_restaurant_controler(request):
    """GET request controller to return restaurant and
    its tags by id
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
                    "id": "restaurantId" + id,
                    "name": (str),
                    "description": (str),
                    "addres_id": curently str,
                    "owner_id": (int),
                    "menu_id": (int)
                    "tags": [{
                        "id": "tagId" + id
                        "name": tag name
                        "priority": (int)
                    }, ]
                }
            ]
        If restaurant with such id not found  then returns:
        {
            "data": [],
            "success": False,
            "error": Restaurant with id={} not found
        }
    """
    rest_id = request.matchdict["id"]
    query = request.dbsession.query(Restaurant).get(int(rest_id))
    if query is None:
        raise HTTPNotFound("Restaurant with id=%s not found" % (rest_id))
    else:
        rest_with_tags = asign_tags([query])
        body = wrap(rest_with_tags)
    return body


@view_config(
    route_name='user_restaurants',
    renderer='json',
    request_method='GET'
)
@restrict_access(user_types=['Owner'])
def user_restaurants(request):
    """GET request controler to return my restaurants and
    its tags
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
        Style:
            [
                {
                    "id": "restaurantId" + id,
                    "name": (str),
                    "description": (str),
                    "addres_id": curently str,
                    "owner_id": (int),
                    "menu_id": (int)
                    "tags": [{
                        "id": "tagId" + id
                        "name": tag name
                        "priority": (int)
                    }, ]
                },
            ]
    """
    restaurants = asign_tags(request.token.user.restaurants)
    body = wrap(restaurants)

    return body


@view_config(
    route_name='user_restaurants',
    request_method="POST",
    renderer='json'
)
@restrict_access(user_types=['Owner'])
def create_user_restaurant(request):
    """
    POST request controller. Create new restaurant in database and return created item
    """
    rest_data = request.json_body

    name, description, phone, address, tags = rest_data["name"], rest_data[
        "description"], rest_data["phone"], rest_data["address"], rest_data["tags"]

    if not name or not address:
        msg = "Fill all required fields"
        request.response.status_code = 201
        return wrap([], success=False, error=msg)

    tag_models = [request.dbsession.query(
        Tag).filter_by(name=tag["name"]).first() for tag in tags]

    rest = Restaurant(name=name, description=description,
                      phone=phone, address_id=address)
    rest.tag = tag_models
    rest.user = request.token.user
    try:
        request.dbsession.add(rest)
        request.dbsession.flush()
        rest_with_tags = asign_tags([rest])
        request.response.status_code = 201
        return wrap(rest_with_tags, message="Restaurant was successfully created")
    except Exception:
        request.response.status_code = 500
        return wrap([], success=False, error='Could not save your retaurant.')


@view_config(
    route_name='user_restaurant',
    request_method="GET",
    renderer='json'
)
@restrict_access(user_types=['Owner'])
def get_user_restaurant(request):
    """
    GET request controller. Get restaurant for single owner user
    """
    rest_id = request.matchdict["id"]

    rest = request.dbsession.query(Restaurant).get(int(rest_id))
    if rest is None:
        raise HTTPNotFound("Restaurant with id=%s not found" % (rest_id))
    else:
        rest_with_tags = asign_tags([rest])
        body = wrap(rest_with_tags)

    return body


@view_config(
    route_name='user_restaurant',
    request_method="PUT",
    renderer='json'
)
@restrict_access(user_types=['Owner'])
def update_user_restaurant(request):
    """
    PUT request controller. Update restaurant in database and return updated item
    """
    rest_data = request.json_body
    rest_id = request.matchdict["id"]
    rest = request.dbsession.query(Restaurant).get(int(rest_id))

    name, description, phone, address, tags = rest_data["name"], rest_data[
        "description"], rest_data["phone"], rest_data["address"], rest_data["tags"]

    try:
        if name:
            rest.name = name
        if description:
            rest.description = description
        if phone:
            rest.phone = phone
        if address:
            rest.address_id = address
        if tags:
            tag_models = [request.dbsession.query(
                Tag).filter_by(name=tag["name"]).first() for tag in tags]
            rest.tag = tag_models
        request.response.status_code = 201
        return wrap(rest.as_dict(), message="Restaurant was successfully updated")
    except Exception:
        request.response.status_code = 500
        return wrap([], success=False, error='Cannot update your retaurant.')
