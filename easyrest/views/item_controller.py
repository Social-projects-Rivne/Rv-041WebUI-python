"""
This module describe item controler
"""

from pyramid.view import view_config
from pyramid.response import Response
from pyramid.httpexceptions import HTTPNotFound
from sqlalchemy.exc import IntegrityError
from pyramid.httpexceptions import HTTPForbidden

from ..scripts.json_helpers import wrap
from ..models.menu_item import MenuItem
from ..auth import restrict_access


@view_config(
    route_name='menu_item',
    request_method="PUT",
    renderer='json'
)
@restrict_access(user_types=['Client', 'Owner'])
def update_menu_item(request):
    """
    POST request controller. Update restaurant menu item in database and return updated item
    """

    from_data = request.json_body
    menu_item_id = request.matchdict["item_id"]
    item = request.dbsession.query(MenuItem).get(int(menu_item_id))

    if item is None:
        raise HTTPNotFound("Item not found")

    item.update_item(request.dbsession, from_data)

    return wrap(item.as_dict(with_relations=["category"]))


@view_config(
    route_name='menu_item',
    request_method="DELETE",
    renderer='json'
)
@restrict_access(user_types=['Client', 'Owner'])
def delete_menu_item(request):
    """
    DELETE request controller. DELETE restaurant menu item in database and return deleted item
    """
    menu_item_id = request.matchdict["item_id"]

    item = request.dbsession.query(MenuItem).get(int(menu_item_id))
    if item is None:
        raise HTTPNotFound("Item not found")

    request.dbsession.delete(item)

    return wrap(item.as_dict())
