def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')
    config.add_route('restaurants', 'restaurants', request_method="GET")
    config.add_route('restaurant', 'restaurants/{id}', request_method="GET")
