"""This module describe menu controler
This module describes behavior of /restaurant/{id}/menu route
"""

from pyramid.view import view_config
from pyramid.response import Response
from pyramid.httpexceptions import HTTPNotFound
from sqlalchemy.exc import IntegrityError
from pyramid.httpexceptions import HTTPForbidden

from ..scripts.json_helpers import wrap
from ..models.restaurant import Restaurant
from ..models.menu import Menu
from ..models.menu_item import MenuItem
from ..models.category import Category
from ..auth import restrict_access


def asign_items(menu):
    menu_dict = menu.as_dict()
    menu_items = [item.as_dict() for item in menu.menu_item]
    menu_dict.update({"menu_items": menu_items})
    return menu_dict


@view_config(route_name='get_all_categories', renderer='json', request_method='GET')
def get_all_categories(request):
    """
    GET request controler to return all categories
    Args:
        request: current pyramid request
    """
    categories_query = request.dbsession.query(Category)
    categories = categories_query.all()

    categories_as_dict = [category.as_dict() for category in categories]
    body = wrap(categories_as_dict)

    return body


@view_config(route_name='menus', renderer='json', request_method='GET')
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
        Where data is list with menus asign for current restaurant. Format:
            [
                {
                    "id": "menuId" + id,
                    "name": (str),
                    "rest_id": (int)
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


@view_config(route_name='menus', renderer='json', request_method='POST')
def add_menu_controler(request):
    from_data = request.json_body
    menu_id = Menu.create_menu(request.dbsession, from_data)

    return wrap(menu_id)


@view_config(route_name='menu_items', renderer='json', request_method='GET')
def get_cats_controler(request):
    """GET request controler to return menu items
    for restaurant specified by id and menu id
    Args:
        request: current pyramid request
    Return:
        404 if menu or restaurant don`t exist
        If menu has data(not image menu) format:
        {
            Items: (list of dicts) menu items
            Categories: (list)
            isImage: False
        }
        if menu has image:
        {
            isImage: True,
            imageUrl: (str)
        }
    """
    menu_id = int(request.matchdict['menu_id'])
    rest_id = request.matchdict['rest_id']
    only_items = False

    try:
        params = request.params["items"]
        only_items = True if params == "true" else False
    except KeyError:
        pass

    menu = request.dbsession.query(Menu).filter(
        Menu.rest_id == rest_id, menu_id == Menu.id).first()

    if menu is None:
        raise HTTPNotFound("Cant' found menu!")

    if menu.image is not None:
        body = wrap({
            "isImage": True,
            "imageUrl": menu.image
        })
    else:
        if only_items:
            items_list = menu.get_menu_items(request.dbsession, rest_id)
            body = wrap(items_list)
        else:
            cats_list, data_dict = menu.get_items_with_cat(
                request.dbsession, exclude=["menu_id"])

            body = wrap({
                "Items": data_dict,
                "Categories": cats_list,
                "restaurantName": menu.rest.name,
                "isImage": False
            })

    return body


@view_config(
    route_name='menu_items',
    request_method="POST",
    renderer='json'
)
@restrict_access(user_types=['Client', 'Owner'])
def create_restaurant_menu_item(request):
    """
    POST request controller. Create new restaurant menu item in database and return created item
    """
    menu_item_data = request.json_body

    rest_id = request.matchdict['rest_id']
    menu_type = int(request.matchdict['menu_id'])

    menu_models = request.dbsession.query(
        Menu).filter_by(rest_id=rest_id).all()

    name = menu_item_data["name"]
    description = menu_item_data["description"]
    ingredients = menu_item_data["ingredients"]
    img = menu_item_data["img"]
    category = menu_item_data["category"]
    menu_id = menu_models[menu_type - 1].id

    category_model = request.dbsession.query(
        Category).filter_by(name=category).first()

    new_menu_item = MenuItem(name=name, description=description,
                             ingredients=ingredients, img=img, menu_id=menu_id, category_id=category_model.id, category=category_model)

    request.dbsession.add(new_menu_item)
    request.dbsession.flush()

    new_menu_item_as_dict = new_menu_item.as_dict()
    new_menu_item_as_dict["category"] = category_model.name

    request.response.status_code = 201
    return wrap(new_menu_item_as_dict, message="New menu item was successfully created")


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
