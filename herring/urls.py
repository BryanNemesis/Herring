from django.contrib import admin
from django.urls import path, re_path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('fillets.urls')),
    path('', include('accounts.urls')),
    re_path('profiles?/', include('profiles.urls')),
    path('api/fillets/', include('fillets.api.urls')),
    re_path('api/profiles?/', include('profiles.api.urls')),

]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
