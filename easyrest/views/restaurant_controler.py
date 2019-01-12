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
    """GET request controler to return restaurant and
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
    route_name='get_my_restaurant',
    renderer='json',
    request_method='GET'
)
def get_my_restaurant_controller(request):
    owner = request.params['owner']
    my_rests = request.dbsession.query(
        Restaurant).filter_by(owner_id=owner).all()
    my_rests_with_tags = asign_tags(my_rests)

    body = wrap(my_rests_with_tags)

    return body


@view_config(
    route_name='add_restaurant',
    request_method='POST',
    renderer='json'
)
def add_restaurant_controller(request):
    rest_data = request.json_body

    name,  phone, address, description, tags = rest_data["name"], rest_data[
<<<<<<< HEAD
        "phone"], rest_data["address"], rest_data["description"], rest_data["tags"]
=======
        "phone"], rest_data["address"], rest_data["description"], rest_data["tag"]
>>>>>>> 1344ded0d67ca0cf45469385e2dbdb25f459339a

    tag_models = [request.dbsession.query(
        Tag).filter_by(name=tag).first() for tag in tags]

    rest = Restaurant(name=name, description=description,
                      phone=phone, address_id=address, owner_id="Jason Brown",)

    rest.tag = tag_models

    request.dbsession.add(rest)
    request.dbsession.flush()

    return wrap(asign_tags([rest]))


@view_config(
    route_name='update_restaurant',
    request_method='PUT',
    renderer='json'
)
def update_restaurant_controller(request):
    rest_data = request.json_body
    rest_id = request.matchdict["id"]

<<<<<<< HEAD
    name, description, phone, address, tags = rest_data["name"], rest_data[
        "description"], rest_data["phone"], rest_data["address"], rest_data["tags"]
=======
    name, description, phone, address, tag = rest_data["name"], rest_data[
        "description"], rest_data["phone"], rest_data["address"]
>>>>>>> 1344ded0d67ca0cf45469385e2dbdb25f459339a

    rest = request.dbsession.query(Restaurant).get(int(rest_id))

    if name:
        rest.name = name
    if description:
        rest.description = description
    if phone:
        rest.phone = phone
    if address:
        rest.address_id = address

    return wrap(rest.as_dict())
