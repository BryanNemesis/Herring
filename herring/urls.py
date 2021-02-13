from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

from fillets.views import (
    home_view,
    fillet_list_view,
    fillet_detail_view,
    fillet_create_view,
    fillet_delete_view,
    fillet_action_view,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home_view),
    path('react/', TemplateView.as_view(template_name='react-via-dj.html')),
    path('create-fillet/', fillet_create_view),
    path('fillets/', fillet_list_view),
    path('fillets/<int:fillet_id>/', fillet_detail_view),
    path('api/fillets/', include('fillets.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
