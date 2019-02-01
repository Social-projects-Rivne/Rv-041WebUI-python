"""This module describe menu controler
This module describes behavior of /restaurant/{id}/menu route
"""

from pyramid.view import view_config
from pyramid.httpexceptions import HTTPNotFound

from ..scripts.json_helpers import wrap
from ..models.order import Order
from ..models.order_assoc import OrderAssoc
from ..models.user import User


@view_config(route_name='get_orders', renderer='json', request_method='GET')
def get_orders(request):
    order_ids = [1, 2]

    b = []
    for order_id in order_ids:
        order = request.dbsession.query(Order).get(order_id)
        a = order.get_items(request.dbsession)
        b.append(a)
    dict_ = b

    # items = []
    # for item in order.quantity:
    #     item1 = item.item
    #     d = item1.as_dict()
    #     d.update({"quantity": item.quantity})
    #     items.append(d)
    # dict_ = {
    #     "user": order.user.as_dict(["password", "email", "birth_date"]),
    #     "quantity": [item.as_dict() for item in order.quantity],
    #     "items": items,  # [item.item.as_dict() for item in order.quantity],
    #     "order": order.as_dict()
    # }
    # dict_ = {
    #     "order": [item.as_dict() for item in request.dbsession.query(User).get(14).orders]
    # }
    # dict_ = {
    #     "order": [item.as_dict() for item in request.token.user.orders]
    #     "items": [item.as_dict() for item in [for order in request.token.user.orders]]
    # }
    return wrap(dict_)


@view_config(route_name='get_orders', renderer='json', request_method='POST')
def change_q(request):
    """JSON in:
    {
        "order_id": (int)
        "q_id": (int)
        "value": (int)
    }

    """
    # json = request.json_body
    # order_id, q_id, value = int(json["order_id"]), int(
    #     json["q_id"]), int(json["value"])

    # try:
    #     # order_id index of order in connected list
    #     order = request.token.user.orders[order_id]
    # except IndexError:
    #     raise HTTPNotFound("You dont have that order")

    # order.change_quantity(request.dbsession, q_id, value)
    """JSON in:
    {
        "order_id": (int)
        "q_value": (int)
        "item_id": (int)
    }
    """

    json = request.json_body
    order_id, q_value, item_id = int(json["order_id"]), int(
        json["q_value"]), int(json["item_id"])

    try:
        # order_id index of order in connected list
        order = request.token.user.orders[order_id]
    except IndexError:
        raise HTTPNotFound("You dont have that order")

    order.add_item(request.dbsession, q_value, item_id)

    # items = []
    # for item in order.quantity:
    #     item1 = item.item
    #     d = item1.as_dict()
    #     d.update({"quantity": item.quantity})
    #     items.append(d)
    # dict_ = {
    #     "user": order.user.as_dict(["password", "email", "birth_date"]),
    #     "quantity": [item.as_dict() for item in order.quantity],
    #     "items": items,  # [item.item.as_dict() for item in order.quantity],
    #     "order": order.as_dict()
    # }
    # dict_ = {
    #     "order": [item.as_dict() for item in request.dbsession.query(User).get(14).orders]
    # }
    # dict_ = {
    #     "order": [item.as_dict() for item in request.token.user.orders]
    #     "items": [item.as_dict() for item in [for order in request.token.user.orders]]
    # }
    return ""
