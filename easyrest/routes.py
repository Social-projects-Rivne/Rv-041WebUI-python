"""
This module describes available routes for app
"""


def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('get_tags', 'tag', request_method="GET")
    config.add_route('get_all_restaurants', 'restaurant',
                     request_method="GET")
    config.add_route('get_restaurant', 'restaurant/{id:[1-9]\d*}',
                     request_method="GET")
    config.add_route('get_menu', 'restaurant/{id:[1-9]\d*}/menu',
                     request_method="GET")
    config.add_route('get_user_info', 'profile',
                     request_method="GET")
    config.add_route('options_handling', '/{catch_all:.*}',
                     request_method="OPTIONS")
