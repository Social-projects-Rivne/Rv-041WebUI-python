from pyramid.view import view_config
from pyramid.httpexceptions import HTTPNotFound, HTTPForbidden, HTTPBadRequest

from ..auth import restrict_access
from ..scripts.json_helpers import wrap
from ..models import User, UserRole, Restaurant


def sort_orders(item):
    if item["status"] == "Assigned waiter":
        return 1
    if item["status"] == "In progress":
        return 0
    if item["status"] == "History":
        return 2


@view_config(route_name='get_waiters', renderer='json', request_method='GET')
@restrict_access(user_types=["Administrator"])
def get_waiters(request):

    with_orders = request.params.get("with_orders", False)

    waiters_models = request.dbsession.query(User)\
        .filter(User.restaurant_id == Restaurant.id)\
        .filter(Restaurant.administrator_id == request.token.user.id).all()

    if with_orders:
        # waiters = [waiter.as_dict(include=["name", "id"]) for waiter in waiters]
        waiters = []
        exclude = ["password", "email"]
        for waiter in waiters_models:
            waiter_dict = waiter.as_dict(include=["name", "id"])
            w_orders = []
            for order in waiter.w_orders:
                if order.status == "History":
                    continue
                order_dict = order.as_dict(with_relations=["user"], exclude=exclude)
                order_dict.update({
                    "items": order.get_items(request.dbsession)
                })
                w_orders.append(order_dict)
            waiter_dict.update({
                "w_orders": sorted(w_orders, key=sort_orders)
            })
            waiters.append(waiter_dict)
    else:
        waiters = [waiter.as_dict(include=["name", "id"]) for waiter in waiters_models]

    return wrap(waiters)
