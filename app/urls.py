from django.conf.urls.static import static
from django.urls import path

from .views import *

urlpatterns = [
    path('', HomePageView.as_view(), name='home_page'),
]
