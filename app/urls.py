from django.urls import path

from .views import *

urlpatterns = [
    path('produkty/', ProductsPageView.as_view(), name='product_page'),
    path('', HomePageView.as_view(), name='home_page'),
]
