from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
	path('ai/', include('ai.urls')),
	path('', include('frontend.urls'))
]
