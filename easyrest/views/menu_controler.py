"""This module describe menu controler
This module describes behavior of /restaurant/{id}/menu route
"""

from pyramid.view import view_config
from pyramid.response import Response
from pyramid.httpexceptions import HTTPNotFound

from ..scripts.json_helpers import wrap
from ..models.restaurant import Restaurant


def asign_items(menu):
    menu_dict = menu.as_dict()
    menu_items = [item.as_dict() for item in menu.menu_item]
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
    rest = request.dbsession.query(Restaurant).get(rest_id)
    if not rest:
        raise HTTPNotFound("Restaurant with id=%s not found" % (rest_id))
    menu_dict = asign_items(rest.menu)
    body = wrap([menu_dict])
    return body
