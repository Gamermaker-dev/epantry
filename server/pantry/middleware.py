class AuthorizationHeaderMiddleWare:
    def __init__(self, get_response=None):
        self.get_response = get_response
    
    def __call__(self, request):
        token = request.COOKIES.get('token')
        if token is not None:
            request.META['HTTP_AUTHORIZATION'] = f'Token {token}'
        return self.get_response(request)