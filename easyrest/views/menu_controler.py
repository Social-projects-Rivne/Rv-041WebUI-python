"""This module describe menu controler
This module describes behavior of /restaurant/{id}/menu route
"""

from pyramid.view import view_config
from pyramid.response import Response
from pyramid.httpexceptions import HTTPNotFound

from ..scripts.json_helpers import wrap
from ..models.restaurant import Restaurant
from ..models.menu import Menu
from ..models.menu_item import MenuItem


def asign_items(menu):
    menu_dict = menu.as_dict()
    menu_items = [item.as_dict() for item in menu.menu_item]
    menu_dict.update({"menu_items": menu_items})
    return menu_dict


@view_config(route_name='get_menus', renderer='json', request_method='GET')
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
    rest_id = request.matchdict['rest_id']
    rest = request.dbsession.query(Restaurant).get(rest_id)
    if not rest:
        raise HTTPNotFound("Restaurant with id=%s not found" % (rest_id))
    menus = [menu.as_dict() for menu in rest.menu]
    body = wrap(menus)
    return body


@view_config(route_name='get_categories', renderer='json', request_method='GET')
def get_cats_controler(request):
    """GET request controler to return menu and
    its items for restaurant specified by id
    Args:
        request: current pyramid request
    """
    menu_id = request.matchdict['menu_id']
    menu = request.dbsession.query(Menu).get(menu_id)

    cat_list = [cat.as_dict() for cat in menu.categories]
    body = wrap(cat_list)
    return body


@view_config(route_name='get_by_category', renderer='json', request_method='GET')
def get_by_cat_controler(request):
    """GET request controler to return menu and
    its items for restaurant specified by id
    Args:
        request: current pyramid request
    """
    menu_id = request.matchdict['menu_id']
    cat_id = request.matchdict['cat_id']
    menu_models = request.dbsession.query(MenuItem).filter_by(
        menu_id=menu_id, category_id=cat_id).all()

    # print(menu_items.menu_items)

    menu_items = [item.as_dict() for item in menu_models]
    # body = wrap(menu_items)
    return menu_items
