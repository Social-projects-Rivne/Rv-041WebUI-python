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


def get_order(request, order_id, field=False):
    """'Smart' get order. If you want to specify some constrains 
    on get order pass field.
    Example:
        {
            "field_name": value
            ...
        }
    """
    if field:
        order = request.dbsession.query(Order)\
            .filter(Order.id == order_id)\
            .filter_by(**field)\
            .first()
    else:
        user_id = request.token.user.id
        order = request.dbsession.query(Order).filter(
            Order.id == order_id, Order.user_id == user_id).first()

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
@restrict_access(user_types=["Client", "Owner"])
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

    order = Order(creation_time=int(time.time()), status="Draft")
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
@restrict_access(user_types=["Client", "Owner"])
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
@restrict_access(user_types=["Client", "Owner"])
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
@restrict_access(user_types=["Client", "Owner"])
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
@restrict_access(user_types=["Client", "Owner"])
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
@restrict_access(user_types=["Client", "Owner"])
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
@restrict_access(user_types=["Client", "Owner", "Administrator", "Waiter"])
def change_status(request):
    """Controller for changing order status shared between:
        "Client", "Administrator", "Waiter"
    Expects:
        {
            "new_status": (str) name of new status
            "set_waiter_id": (int) waiter id
            "booked_time": (int) UNIX time
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
    except ValueError:
        raise HTTPBadRequest("Not valid json")

    print(json)

    schema = {
        "description": "Validate json inputs",
        "type": "object",
        "properties": {
            "set_waiter_id": {"type": ["integer", "None"]},
            "booked_time": {"type": ["integer", "None"]},
            "new_status": {"type": "string"}
        },
        "required": ["new_status"]
    }

    try:
        validation(schema, json)
    except ValidationError as e:
        raise HTTPForbidden("Wrong input data %s" % e)

    query_constrains = {}

    if request.token.user.role.name == "Waiter":
        query_constrains.update({
            "waiter_id": request.token.user.id
        })
    elif request.token.user.role.name == "Administrator":
        # TODO add Administrator specific order constrain
        query_constrains.update({
            "waiter_id": request.token.user.id
        })
        pass

    order = get_order(request, order_id, query_constrains)

    waiter_id = json.get("set_waiter_id", False)
    if waiter_id:
        waiter = request.dbsession.query(User).filter_by(id=waiter_id).first()
    else:
        waiter = None

    time = json.get("booked_time", None)

    new_status = json["new_status"]

    role = request.token.user.role.name

    new_order = order.change_status(
        new_status, role, waiter, time).as_dict(exclude=["table"])

    return wrap(new_order)


@view_config(route_name='order_status', renderer='json', request_method='GET')
@restrict_access(user_types=["Client", "Owner", "Administrator", "Waiter"])
def get_status(request):
    order_id = request.matchdict["order_id"]

    order = get_order(request, order_id)

    data = {
        "status": order.status,
        "total price": order.count_total()
    }

    return wrap(data)
