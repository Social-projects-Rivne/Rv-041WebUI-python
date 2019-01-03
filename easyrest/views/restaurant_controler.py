"""
This module describe menu controler
This module describes behavior of /restaurant/{id} and
/restaurant routes
"""

from pyramid.view import view_config
from pyramid.response import Response

from pyramid.httpexceptions import HTTPNotFound

from sqlalchemy.exc import DBAPIError

from json import dumps

from ..models.Restaurant import Restaurant


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
                    tags: [<tag dictionary>, ]
                },
            ]"""
    rests_list = [rest.as_dict() for rest in rests]
    for i, rest in enumerate(rests):
        del(rests_list[i]["menu_id"])
        rests_list[i]["id"] = "restaurantId" + str(rests_list[i]["id"])
        tags = rest.tag
        tags_list = [tag.as_dict() for tag in tags]
        for tag in tags_list:
            tag["id"] = "tagId" + str(tag["id"])
        rests_list[i].update({"tags": tags_list})
    return rests_list


def return_all():
    """Function for quering all restaurants and asign them tags
    data = restourant models coverted to dict with tags asigned
    Returns:
        Json response in format:
            {
                "data": [<data>, ],
                "name": "get_restaurant"
            }
    """
    rests = request.dbsession.query(Restaurant).all()
    rests_dict = asign_tags(rests)
    
    response = Response(body=dumps({"data": rests_dict, "name": "get_restaurant" }))
    return response


@view_config(route_name='get_all_restaurants', renderer='json', request_method='GET')
def get_all_restaurant_controler(request):
    """Controler to return all restaurants with tags asigned in json format
    Uses function return_all() from this module"""
    response = return_all()
    return response


@view_config(route_name='get_restaurant', renderer='json', request_method='GET')
def get_restaurant_controler(request):
    id = request.matchdict["id"]
    query = request.dbsession.query(Restaurant).filter(Restaurant.id == id).all()
    if len(query) == 0:
        response = Response(body=dumps({"data": [], "name": "get_restaurant_by_id" }))
    else:
        rests_dict = asign_tags(query)
        response = Response(body=dumps({"data": rests_dict, "name": "get_restaurant_by_id" }))

    return response