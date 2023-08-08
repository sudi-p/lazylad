def check_logged_in(request):
    if request.session.has_key('email'):
        email = 
