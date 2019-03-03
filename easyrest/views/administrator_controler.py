from pyramid.view import view_config
from pyramid.httpexceptions import HTTPNotFound, HTTPForbidden, HTTPBadRequest

from ..auth import restrict_access
from ..scripts.json_helpers import wrap
from ..models import User, UserRole, Restaurant


@view_config(route_name='get_waiters', renderer='json', request_method='GET')
@restrict_access(user_types=["Administrator"])
def get_waiters(request):

    with_orders = request.params.get("with_orders", False)

    waiters = request.dbsession.query(User)\
        .filter(User.restaurant_id == Restaurant.id)\
        .filter(Restaurant.administrator_id == request.token.user.id).all()

    if with_orders:
        # waiters = [waiter.as_dict(include=["name", "id"]) for waiter in waiters]
        waiters = []
        for waiter in waiters:
            waiter_dict = waiter.as_dict(include=["name", "id"])
            w_orders = []
            for order in waiter.w_orders:
                order_dict = order.as_dict()
                order_dict.update({
                    "items": order.get_items(request.dbsession)
                })
                w_orders.append(order_dict)
            waiter_dict.update({
                "w_orders": w_orders
            })
            waiters.append(waiter_dict)
    else:
        waiters = [waiter.as_dict(include=["name", "id"]) for waiter in waiters]

    return wrap(waiters)
