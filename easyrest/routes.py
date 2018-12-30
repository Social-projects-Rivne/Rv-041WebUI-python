def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')
    # RazSK 28.12.2018 Begin
    # add routes for Restaurant
    config.add_route('restaurant', 'restaurants/{id}', request_method="GET")
    # RazSK 28.12.2018 End
