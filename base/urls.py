from django.urls import path 
from . import views

urlpatterns=[
    path('', views.home, name ='home'),
    # path('city-weather/', views.cityWheatherPage, name ='city-weather'),
    path('form/', views.cloudburstForm, name ='cloudburst-predict'),
    path('result/', views.resultPage, name = 'result'),
]