from django.urls import path
from . import views
urlpatterns = [
    path('admin_area/', views.admin_area, name="admin_area"),
]
