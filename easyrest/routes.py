from pyramid.events import NewRequest

def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')
    config.add_route('get_tags', '/tag', request_method="GET")
    config.add_route('get_restaurant', '/restaurant', request_method="GET")
    config.add_route('get_menu', '/restaurant/{id}/menu', request_method="GET")
    config.scan()


    #CORS fix for react
    def add_cors_headers_response_callback(event):
        def cors_headers(request, response):
            response.headers.update({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST,GET,DELETE,PUT,OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Max-Age': '1728000',
            })
        event.request.add_response_callback(cors_headers)

    config.add_subscriber(add_cors_headers_response_callback, NewRequest)
