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
from ..models.category import Category


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


@view_config(route_name='get_all_with_cats', renderer='json', request_method='GET')
def get_cats_controler(request):
    """GET request controler to return menu and
    its items for restaurant specified by id
    Args:
        request: current pyramid request
    """
    menu_id = request.matchdict['menu_id']

    result = request.dbsession.query(MenuItem, Category).filter(
        MenuItem.menu_id == menu_id).filter(
        Category.id == MenuItem.category_id).all()

    data_dict = {}
    cats_list = []
    for item, cat in result:
        category, item_dict = cat.name, item.as_dict()
        if category in data_dict:
            data_dict[category].append(item_dict)
        else:
            data_dict[category] = [item_dict]
            cats_list.append(category)

    body = wrap({
        "Items": data_dict,
        "Categories": cats_list
    })
    return body


@view_config(route_name='get_by_category', renderer='json', request_method='GET')
def get_by_cat_controler(request):
    """For future use in sorting by category
    """
    menu_id = request.matchdict['menu_id']
    cat_id = request.matchdict['cat_id']
    menu_models = request.dbsession.query(MenuItem).filter_by(
        menu_id=menu_id, category_id=cat_id).all()

    menu_items = [item.as_dict() for item in menu_models]
    body = wrap(menu_items)
    return body
