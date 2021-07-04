
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('home.urls')),
    path('', include('teams.urls')),
    path('', include('create_predictions.urls')),
    path('', include('admin_area.urls')),
]
