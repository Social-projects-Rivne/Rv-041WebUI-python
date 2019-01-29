"""
This module describes available routes for app
"""


def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('options_handling', '/{catch_all:.*}',
                     request_method="OPTIONS")
    config.add_route('login', 'login', request_method=[
                     "GET", "POST", "DELETE"])
    config.add_route('get_tags', 'tag', request_method="GET")
    config.add_route('get_all_restaurants', 'restaurant',
                     request_method="GET")
    config.add_route('get_restaurant', 'restaurant/{id:\d+}',
                     request_method="GET")
    config.add_route('get_menus', 'restaurant/{rest_id:\d+}/menu',
                     request_method="GET")
    config.add_route('get_all_with_cats', 'restaurant/{rest_id:\d+}/menu/{menu_id:\d+}',
                     request_method="GET")
    config.add_route('get_by_category', 'restaurant/{rest_id:\d+}/menu/{menu_id:\d+}/{cat_id:\d+}',
                     request_method="GET")
    config.add_route('get_user_info', 'profile',
                     request_method="GET")
    config.add_route('authorize_moderator', 'moderator',
                     request_method="GET")
    config.add_route('get_unapproved_restaurants', 'approval_restaurants',
                     request_method="GET")
    config.add_route('approve_restaurant', 'approval_restaurants',
                     request_method=["POST", "DELETE"])
    config.add_route('user_restaurants', 'user_restaurants',
                     request_method=["GET", "POST"])
    config.add_route('user_restaurant', 'user_restaurant/{id:[1-9]\d*}',
                     request_method=["PUT"])
    config.add_route('sign_up', 'sign_up', request_method="POST")
