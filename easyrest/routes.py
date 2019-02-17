"""
This module describes available routes for app
"""


def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('options_handling', '/{catch_all:.*}',
                     request_method="OPTIONS")
    config.add_route('login', 'login',
                     request_method=["GET", "POST", "DELETE"])
    config.add_route('get_tags', 'tag', request_method="GET")
    config.add_route('get_all_restaurants', 'restaurant',
                     request_method="GET")
    config.add_route('get_restaurant', 'restaurant/{id:\d+}',
                     request_method="GET")
    config.add_route('get_menus', 'restaurant/{rest_id:\d+}/menu',
                     request_method="GET")
    config.add_route('menu_items', 'restaurant/{rest_id:\d+}/menu/{menu_id:\d+}',
                     request_method=["GET", "POST", "PUT", "DELETE"])
    config.add_route('get_by_category', 'restaurant/{rest_id:\d+}/menu/{menu_id:\d+}/{cat_id:\d+}',
                     request_method="GET")
    config.add_route('get_all_categories', 'categories',
                     request_method="GET")
    config.add_route('get_user_info', 'profile',
                     request_method="GET")
    config.add_route('get_orders_info', 'profile/orders',
                     request_method="GET")
    config.add_route('authorize_moderator', 'moderator',
                     request_method="GET")
    config.add_route('moderator_get_restaurants', 'moderator/restaurants',
                     request_method="GET")
    config.add_route('moderator_manage_restaurants', 'moderator/restaurants',
                     request_method=["POST", "DELETE"])
    config.add_route('moderator_get_users', 'moderator/users',
                     request_method="GET")
    config.add_route('moderator_manage_users', 'moderator/users',
                     request_method="POST")
    config.add_route('moderator_get_owners', 'moderator/owners',
                     request_method="GET")
    config.add_route('moderator_manage_owners', 'moderator/owners',
                     request_method="POST")
    config.add_route('user_restaurants', 'user_restaurants',
                     request_method=["GET", "POST"])
    config.add_route('user_restaurant', 'user_restaurant/{id:[1-9]\d*}',
                     request_method=["PUT"])
    config.add_route('delete_restaurant', 'delete_restaurant',
                     request_method="PUT")
    config.add_route('sign_up', 'sign_up', request_method="POST")
    config.add_route('get_orders', 'orders', request_method="GET")
    # acording to CRUD(Create, Read, Update, Delete)
    #                 (POST,   GET,  PUT,    DELETE)
    config.add_route('order', 'order', request_method=["POST", "GET", "PUT"])
    config.add_route('order_by_id', 'order/{order_id:\d+}',
                     request_method=["POST", "GET", "PUT", "DELETE"])
    config.add_route('order_status', 'order/{order_id:\d+}/status',
                     request_method=["GET", "PUT"])
