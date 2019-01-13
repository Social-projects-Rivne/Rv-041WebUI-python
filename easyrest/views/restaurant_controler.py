"""This module describe menu controler
This module describes behavior of /restaurant/{id} and
/restaurant routes
"""

from pyramid.view import view_config
from pyramid.response import Response
from pyramid.httpexceptions import HTTPNotFound

from ..scripts.json_helpers import wrap
from ..models.restaurant import Restaurant


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


@view_config(route_name='get_all_restaurants', renderer='json', request_method='GET')
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


@view_config(route_name='get_restaurant', renderer='json', request_method='GET')
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
        body = wrap([rest_with_tags])
    return body


@view_config(route_name='get_my_restaurants', renderer='json', request_method='GET')
def get_my_restaurant_controler(request):
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
    owner = request.headers.get('Authorization')
    # TODO: take owner_id from table users after Max pullrequst
    # TODO: token = request.headers.get('Authorization')
    # TODO: own = request.dbsession.query(User).filter_by(token=token).first()
    # TODO: owner = own[0]['owner_id']
    rests = asign_tags(request.dbsession.query(Restaurant).filter_by(owner_id=owner).all())
    if not rests:
        raise HTTPNotFound("No restaurants in database")
    else:
        body = wrap(rests)

    return body
