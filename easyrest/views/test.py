from pyramid.view import view_config

from ..models.order import Order
from ..models.user import User


@view_config(route_name='test', renderer='json', request_method='GET')
def test(request):
    waiter = request.dbsession.query(User).filter_by(id=17).first()
    waiter2 = request.dbsession.query(User).filter_by(id=10).first()
    order = request.dbsession.query(Order).order_by(Order.id).first()
    # order.waiter = waiter2
    # request.dbsession.flush()
    return order.as_dict()
