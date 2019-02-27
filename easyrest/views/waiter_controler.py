from pyramid.view import view_config

from ..auth import restrict_access
from ..scripts.json_helpers import wrap
from ..models import User, UserRole, Restaurant


@view_config(route_name='get_waiters', renderer='json', request_method='GET')
@restrict_access(user_types=["Administrator"])
def get_waiters(request):

    waiters = request.dbsession.query(User)\
        .filter(User.restaurant_id == Restaurant.id)\
        .filter(Restaurant.administrator_id == request.token.user.id).all()

    print(waiters)

    waiters = [waiter.as_dict(include=["name", "id"]) for waiter in waiters]

    return wrap(waiters)
