from django.shortcuts import render

# Create your views here.


def create_predictions(request):
    return render(request, 'create_predictions/index.html')
