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
from ..models.restaurant import Restaurant
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
    Expects:
    {
        rest_id: (int)
    }
    Return:
    {
        order_id: (int) id of created order
    }
    """
    try:
        rest_id = request.json_body["rest_id"]
    except ValueError as e:
        raise HTTPBadRequest("Not valid json")

    rest = request.dbsession.query(Restaurant).get(rest_id)

    if rest is None:
        raise HTTPNotFound("No such rest")

    order = Order(date_created=int(time.time()), status="Draft")
    user = request.token.user
    order.user = user
    order.restaurant = rest
    request.dbsession.add(order)
    request.dbsession.flush()
    # if order.id is None:
    #     raise HTTPBadRequest("Something went wrong")
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
    try:
        rest_id = int(request.params["rest_id"])
    except KeyError:
        raise HTTPNotFound("No rest_id found in Get params")
    except ValueError:
        raise HTTPForbidden("rest_id should be iteger")

    order = request.dbsession.query(Order).filter(
        Order.status == "Draft",
        Order.user_id == request.token.user.id,
        Order.rest_id == rest_id).first()

    if order is None:
        raise HTTPNotFound("No order in draft")

    data = order.as_dict(exclude=["user_id"])
    data.update({
        "items": order.get_items(request.dbsession)
    })
    return wrap(data)


@view_config(route_name='order', renderer='json', request_method='PUT')
@restrict_access(user_types=["Client"])
def parse_localStorage(request):
    """Controller for get dictionary from list of items ids
    DEPRECATED
    Expects:
    {
        rest_id: (int),
        items: [id (int), ...]
    }
    Return:
    [
        MenuItem.as_dict(), ...
    ]
    """

    try:
        json = request.json_body
    except ValueError as e:
        raise HTTPBadRequest("Not valid json")

    schema = {
        "description": "Validate json inputs",
        "type": "object",
        "properties": {
                "rest_id": {"type": "integer"},
                "items": {"type": "array", "items": {
                    "type": "integer",
                    "minimum": 0
                }}
        },
    }

    try:
        validation(schema, json)
    except ValidationError as e:
        raise HTTPForbidden("Wrong input data %s" % e)

    menu_items = request.dbsession.query(
        MenuItem).filter(MenuItem.id.in_(json)).all()

    data = [item.as_dict(exclude=["category_id"]) for item in menu_items]

    return wrap(data)


@view_config(route_name='order_by_id', renderer='json', request_method='POST')
@restrict_access(user_types=["Client"])
def add_item(request):
    """Controller for add item with some quantity to order
    Expects:
    {
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
                "item_id": {"type": "integer"}
        },
        "required": ["q_value", "item_id"]
    }

    try:
        validation(schema, json)
    except ValidationError as e:
        raise HTTPForbidden("Wrong input data %s" % e)

    q_value, item_id = int(json["q_value"]), int(json["item_id"])

    order = get_order(request, order_id)

    order.add_item(request.dbsession, q_value, item_id)

    data = order.get_item(request.dbsession, item_id, exclude=["categoty_id"])

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
            "quantity": {"type": "integer"},
            "item_id": {"type": "integer"}
        },
        "required": ["quantity", "item_id"]
    }

    try:
        validation(schema, json)
    except ValidationError as e:
        raise HTTPForbidden("Wrong input data %s" % e)

    quantity, item_id = int(json["quantity"]), int(json["item_id"])

    order = get_order(request, order_id)

    item = order.change_quantity(request.dbsession, item_id, quantity)

    data = item.as_dict()

    return wrap(data)


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

    items_delited = order.remove_item(request.dbsession, item_id)

    return wrap(items_delited)


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

    status, role, action = order.status, request.token.user.role.name, json["action"]

    # State transition graph
    # (status, role, action)
    # User->Submit = User press Submit
    grahp = {
        ("0", "Client", "bla"): "Draft",
        ("Draft", "Client", "Submit"): "Waiting for confirm",
        ("Draft", "Client", "Remove"): "Removed",
        ("Waiting for confirm", "Client", "Undo"): "Draft",
        ("Waiting for confirm", "Administrator", "Reject"): "Declined",
        ("Waiting for confirm", "Administrator", "Accept"): "Accepted",
        ("Declined", "Client", "Remove"): "Removed",
        ("Declined", "Client", "Edit"): "Draft",
        ("Declined", "Client", "Ok"): "History",
        ("History", "Client", "Reorder"): "Draft",
        ("Accepted", "Administrator", "Cancel"): "Declined",
        ("Accepted", "Administrator", "Asign waiter"): "Asigned waiter",
        ("Accepted", "Waiter", "Asign waiter"): "Asigned waiter",
        ("Accepted", "Client", "Edit"): "Draft",
        ("Asigned waiter", "Waiter", "Start order"): "In progress",
        ("In progress", "Administrator", "Client failed"): "Failed",
        ("In progress", "Client", "Rest failed"): "Failed",
        ("In progress", "Waiter", "Close order"): "Waiting for feedback",
        ("Failed", "Moderator", "Reviewed"): "History",
        ("Waiting for feedback", "Client", "Feedback"): "History",
        ("Waiting for feedback", "Client", "Skip"): "History"
    }

    try:
        new_status = grahp[(status, role, action)]
    except KeyError as e:
        # object sending not for production
        raise HTTPForbidden("Forbidden action %s" % e)

    order.status = new_status

    return wrap(order.status)


@view_config(route_name='order_status', renderer='json', request_method='GET')
@restrict_access(user_types=["Client", "Administrator", "Waiter"])
def get_status(request):
    order_id = request.matchdict["order_id"]

    order = get_order(request, order_id)

    data = {
        "status": order.status,
        "total price": order.count_total()
    }

    return wrap(data)
