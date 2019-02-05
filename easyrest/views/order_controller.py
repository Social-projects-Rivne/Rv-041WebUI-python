"""This module describe menu controler
This module describes behavior of /restaurant/{id}/menu route
"""
import time

from pyramid.view import view_config
from pyramid.httpexceptions import HTTPNotFound, HTTPForbidden, HTTPBadRequest

from ..scripts.json_helpers import wrap
from ..models.order import Order
from ..models.order_assoc import OrderAssoc
from ..models.menu_item import MenuItem
from ..models.user import User
from ..auth import restrict_access
from ..models.validator import validation
from ..exceptions import ValidationError


def get_order(request, order_id):
    order = request.dbsession.query(Order).filter(
        Order.id == order_id, Order.user_id == request.token.user.id).first()

    if order is None:
        raise HTTPNotFound("Order not found")

    return order


@view_config(route_name='get_orders', renderer='json', request_method='GET')
@restrict_access(user_types=["Client"])
def get_orders(request):
    """Controller for get list of user orders without items
    Return:
        [
            Order.as_dict(), ...
        ]
    """
    orders = request.token.user.orders
    data = [order.as_dict(exclude=["user_id", "rest_id"]) for order in orders]
    return wrap(data)


@view_config(route_name='order', renderer='json', request_method='POST')
@restrict_access(user_types=["Client"])
def create_draft_order(request):
    """Controller for creating empty(in Draft) order
    Return:
    {
        order_id: (int) id of created order
    }
    """
    order = Order(date_created=int(time.time()))
    user = request.token.user
    order.user = user
    request.dbsession.flush()
    data = {
        "order_id": order.id
    }
    return wrap(data)


@view_config(route_name='order', renderer='json', request_method='GET')
@restrict_access(user_types=["Client"])
def get_draft_order(request):
    """Controller for get order in draft by token
    Return:
        Order.as_dict()
    """
    order = request.dbsession.query(Order).filter(
        Order.status == "Draft", Order.user_id == request.token.user.id).first()
    if order is None:
        raise HTTPNotFound("No order in draft")
    data = order.as_dict(exclude=["user_id", "rest_id"])
    data.update({
        "items": order.get_items(request.dbsession)
    })
    return wrap(data)


@view_config(route_name='order', renderer='json', request_method='PUT')
@restrict_access(user_types=["Client"])
def parse_localStorage(request):
    """Controller for get dictionary from list of items ids
    Expects:
    [
        id (int), ...
    ]
    Return:
    [
        MenuItem.as_dict(), ...
    ]
    """

    try:
        menu_item_ids = request.json_body
    except ValueError as e:
        raise HTTPBadRequest("Not valid json")

    schema = {
        "description": "Validate json inputs",
        "type": "array",
        "items": {
            "type": "integer",
            "minimum": 0
        },
    }

    try:
        validation(schema, menu_item_ids)
    except ValidationError as e:
        raise HTTPForbidden("Wrong input data %s" % e)

    menu_items = request.dbsession.query(
        MenuItem).filter(MenuItem.id.in_(menu_item_ids)).all()

    data = [item.as_dict(exclude=["category_id"]) for item in menu_items]

    return wrap(data)


@view_config(route_name='order_by_id', renderer='json', request_method='POST')
@restrict_access(user_types=["Client"])
def add_item(request):
    """Controller for add item with some quantity to order
    Expects:
    {
        "order_id": (int)
        "q_value": (int)
        "item_id": (int)
    }
    Return:
        {
            success: True,
            data: [],
            error: None
            message: None
        }
    """
    try:
        json = request.json_body
    except ValueError as e:
        raise HTTPBadRequest("Not valid json")

    schema = {
        "description": "Validate json inputs",
        "type": "object",
        "properties": {
                "order_id": {"type": "integer"},
                "q_value": {"type": "integer"},
                "item_id": {"type": "integer"}
        },
        "required": ["order_id", "q_value", "item_id"]
    }

    try:
        validation(schema, json)
    except ValidationError as e:
        raise HTTPForbidden("Wrong input data %s" % e)

    order_id, q_value, item_id = int(json["order_id"]), int(
        json["q_value"]), int(json["item_id"])

    order = get_order(request, order_id)

    order.add_item(request.dbsession, q_value, item_id)

    data = order.get_items(request.dbsession)

    return wrap(data)


@view_config(route_name='order_by_id', renderer='json', request_method='GET')
@restrict_access(user_types=["Client"])
def get_order_items(request):
    """Controller for get order by id with items

    Return:
        {
            success: True,
            data: [
                Order.as_dict():
                    items: [
                        MenuItem.as_dict(),
                        quantity: (int),
                        q_id: (int) id in OrderAssoc table
                    ]
            ],
            error: None
            message: None
        }

    """
    order_id = request.matchdict["order_id"]

    order = get_order(request, order_id)

    data = order.get_items(request.dbsession, exclude=["catedory_id"])

    return wrap(data)


@view_config(route_name='order_by_id', renderer='json', request_method='PUT')
@restrict_access(user_types=["Client"])
def set_quantity(request):
    """Controller for seting (changing) quantity of order item
    Expects:
        {
            "order_id": (int)
            "item_id": (int)
            "value": (int)
        }
    """
    order_id = request.matchdict["order_id"]

    try:
        json = request.json_body
    except ValueError as e:
        raise HTTPBadRequest("Not valid json")

    schema = {
        "description": "Validate json inputs",
        "type": "object",
        "properties": {
            "order_id": {"type": "integer"},
            "quantity": {"type": "integer"},
            "item_id": {"type": "integer"}
        },
        "required": ["order_id", "quantity", "item_id"]
    }

    try:
        validation(schema, json)
    except ValidationError as e:
        raise HTTPForbidden("Wrong input data %s" % e)

    order_id, quantity, item_id = int(json["order_id"]), int(
        json["quantity"]), int(json["item_id"])

    order = get_order(request, order_id)

    item = order.change_quantity(request.dbsession, item_id, quantity)

    data = item.as_dict()

    return data


@view_config(route_name='order_by_id', renderer='json', request_method='DELETE')
@restrict_access(user_types=["Client"])
def remove_item(request):
    """Controller for removing item from order
    Expects:
        {
            "item_id": (int)
        }
    Return:
        {
            success: True,
            data: [],
            error: None
            message: None
        }
    """
    order_id = request.matchdict["order_id"]

    try:
        json = request.json_body
    except ValueError as e:
        raise HTTPBadRequest("Not valid json")

    schema = {
        "description": "Validate json inputs",
        "type": "object",
        "properties": {
            "item_id": {"type": "integer"}
        },
        "required": ["item_id"]
    }

    try:
        validation(schema, json)
    except ValidationError as e:
        raise HTTPForbidden("Wrong input data %s" % e)

    item_id = int(json["item_id"])

    order = get_order(request, order_id)

    order.remove_item(request.dbsession, item_id)

    return wrap()


@view_config(route_name='order_status', renderer='json', request_method='PUT')
@restrict_access(user_types=["Client", "Administrator", "Waiter"])
def change_status(request):
    """Controller for changing order status shared between:
        "Client", "Administrator", "Waiter"
    Expects:
        {
            "action": (str) name of action
        }
    Return:
        {
            "message": null
            "data": (str) name of order`s new status
            "success": true
            "error": null
        }
    """
    order_id = request.matchdict["order_id"]

    try:
        json = request.json_body
    except ValueError as e:
        raise HTTPBadRequest("Not valid json")

    schema = {
        "description": "Validate json inputs",
        "type": "object",
        "properties": {
            "action": {"type": "string"}
        },
        "required": ["action"]
    }

    try:
        validation(schema, json)
    except ValidationError as e:
        raise HTTPForbidden("Wrong input data %s" % e)

    order = get_order(request, order_id)

    status, action = order.status, json["action"]

    # State transition graph
    # -> shortcut for press
    # User->Submit = User press Submit
    grahp = {
        ("Draft", "User->Submit"): "Waiting for confirm",
        ("Draft", "User->Remove"): "Removed",
        ("Waiting for confirm", "User->Undo"): "Draft",
        ("Waiting for confirm", "RAdmin->Reject"): "Declined",
        ("Waiting for confirm", "RAdmin->Accept"): "Accepted",
        ("Declined", "User->Remove"): "Removed",
        ("Declined", "User->Edit"): "Draft",
        ("Declined", "User->Ok"): "History",
        ("History", "User->Reorder"): "Draft",
        ("Accepted", "RAdmin->Cancel"): "Declined",
        ("Accepted", "RAdmin->Asign waiter"): "Asigned waiter",
        ("Accepted", "Waiter->Asign waiter"): "Asigned waiter",
        ("Accepted", "User->Edit"): "Draft",
        ("Asigned waiter", "Waiter->Start order"): "In progress",
        ("In progress", "RAdmin->User failed"): "Failed",
        ("In progress", "User->Rest failed"): "Failed",
        ("In progress", "Waiter->Close order"): "Waiting for feedback",
        ("Failed", "Moderator->Reviewed"): "History",
        ("Waiting for feedback", "User->Feedback"): "History",
        ("Waiting for feedback", "User->Skip"): "History"
    }

    try:
        new_status = grahp[(status, action)]
    except KeyError as e:
        raise HTTPForbidden("Forbidden action %s" % e)

    order.status = new_status

    return wrap(order.status)


@view_config(route_name='order_status', renderer='json', request_method='GET')
@restrict_access(user_types=["Client", "Administrator", "Waiter"])
def get_status(request):
    order_id = request.matchdict["order_id"]

    order = get_order(request, order_id)

    data = order.status

    return wrap(data)
