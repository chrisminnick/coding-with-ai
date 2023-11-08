from django.http import HttpResponse

# write the view for the joke page. It should display a joke.

def joke(request):
    return HttpResponse("Hello, world. You're at the joke page.")

# write the view for the index page. It should display a welcome message.
def index(request):
    return HttpResponse("Hello, world. You're at the index.")
