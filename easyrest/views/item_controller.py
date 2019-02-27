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
    request_method="POST",
    renderer='json'
)
@restrict_access(user_types=['Client', 'Owner'])
def create_menu_item(request):
    """
    POST request controller. Create new restaurant menu item in database and return created item
    """

    from_data = request.json_body
    item = MenuItem.create_item(request.dbsession, from_data)

    return wrap(item.as_dict())
