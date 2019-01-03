"""
This module describe menu controler
This module describes behavior of /restaurant/{id}/menu route
"""

from pyramid.view import view_config
from pyramid.response import Response

from pyramid.httpexceptions import HTTPNotFound

from sqlalchemy.exc import DBAPIError

from ..scripts.json_helpers import wrap

from ..models.Restaurant import Restaurant


def asign_items(menu):
    menu_dict = menu.as_dict()
    menu_dict["id"] = "menuId" + str(menu_dict["id"])
    menu_items = [item.as_dict() for item in menu.menu_item]
    for item in menu_items:
        item["id"] = "menuItemId" + str(item["id"])
    menu_dict.update({"menu_items": menu_items})
    return menu_dict


@view_config(route_name='get_menu', renderer='json', request_method='GET')
def get_menu_controler(request):
    """GET request controler to return menu and
    its items for restaurant specified by id
    Args:
        request: current pyramid request
    Returns:
        Json string(not pretty) created from dictionary with format:
            {
                "data": data,
                "success": success,
                "error": error
            }
        Where data is list with menus asign for current restaurant
        (Now list with one element). Format:
            [
                {
                    "id": "menuId" + id,
                    "menu_items": [{
                        "id": "menuItemId" + id,
                        "description": description,
                        "ingredients": ingredients,
                        "menu_id": menu_id
                    }, ]
                }
            ]
    """
    rest_id = request.matchdict['id']
    rest = request.dbsession.query(Restaurant).filter(Restaurant.id == rest_id).all()
    if len(rest) == 0:
        body = wrap([], False, "Restaurant with id=%s not found" % (rest_id))
        return Response(body=body)
    menu_dict = asign_items(rest[0].menu)
    body = wrap([menu_dict])
    response = Response(body=body)
    return response
