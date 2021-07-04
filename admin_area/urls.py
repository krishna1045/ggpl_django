from django.urls import path
from . import views
urlpatterns = [
    path('admin/', views.admin_area, name="admin_area"),
]
