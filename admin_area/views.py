from django.shortcuts import render

# Create your views here.


def admin_area(request):
    return render(request, 'admin_area/index.html')
