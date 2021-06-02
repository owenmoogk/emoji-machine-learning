from django.urls import path, include
from .views import *

urlpatterns = [
	path('train/', train),
	path('delete/', delete),
	path('guess/', predict)
]
