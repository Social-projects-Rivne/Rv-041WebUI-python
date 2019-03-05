"""This module describe waiter panel controler
This module describes behavior of /waiter/ route
"""
from pyramid.view import view_config
from sqlalchemy import desc
from ..auth import restrict_access
from ..models.order import Order
from ..scripts.json_helpers import wrap
from ..scripts.json_helpers import form_dict


@view_config(route_name='waiter_manage_orders', renderer='json', request_method='GET')
@restrict_access(user_types=["Waiter"])
def get_orders_controller(request):
    """Controller for get list of user's orders with full order information in particular categories
    Return:
        [
            Order.as_dict(), ...
        ]
    """
    statuses = [
        "Assigned waiter",
        "In progress",
        "History",
    ]
    orders = request.dbsession.query(Order).filter(Order.waiter_id==request.token.user.id,
        Order.status.in_(statuses)).order_by(desc(Order.id)).all()
    data = {}
    data["statuses"] = statuses
    order_keys = ("id", "creation_time", "booked_time", "total_price", "status")
    orders_data = []
    for order in orders:
        order_data = form_dict(order, order_keys, True, True)
        order_data["restaurant"] = order.restaurant.name
        order_data["user"] = order.user.name
        order_data["phone_number"] = order.user.phone_number
        order_data["email"] = order.user.email
        order_items = order.get_items(request.dbsession)
        order_data["items"] = order_items 
        orders_data.append(order_data)
    data["orders_data"] = orders_data
    return wrap(data)
