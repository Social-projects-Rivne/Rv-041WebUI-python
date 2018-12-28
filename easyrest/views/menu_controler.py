from pyramid.view import view_config
from pyramid.response import Response

from pyramid.httpexceptions import HTTPNotFound

from sqlalchemy.exc import DBAPIError

from json import dumps

from ..models.Restaurant import Restaurant

def asign_items(menu):
    menu_dict = menu.as_dict()
    menu_items = [item.as_dict() for item in menu.menu_item]
    menu_dict.update({"menu_items": menu_items})
    return menu_dict


@view_config(route_name='get_menu', renderer='json', request_method='GET')
def get_menu_controler(request):
    rest_id = request.matchdict['id']
    rest = request.dbsession.query(Restaurant).filter(Restaurant.id == rest_id).all()
    if len(rest) == 0:
        return Response(body=dumps({"data":[], "name": "get_menu" }))
    menu_dict = asign_items(rest[0].menu)
    response = Response(body=dumps({"data":menu_dict, "name": "get_menu" }))
    return response
    