from django.urls import path

from .views import (
    fillet_list_view,
    fillet_detail_view,
)

urlpatterns = [
    path('', fillet_list_view),
    path('<int:fillet_id>/', fillet_detail_view),
]
