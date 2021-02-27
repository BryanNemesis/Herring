from django.urls import path

from .views import (
    fillet_list_view,
    fillet_detail_view,
    fillet_create_view,
    fillet_delete_view,
    fillet_action_view,
    fillet_feed_view,
)

urlpatterns = [
    path('', fillet_list_view),
    path('feed/', fillet_feed_view),
    path('action/', fillet_action_view),
    path('create/', fillet_create_view),
    path('<int:fillet_id>/', fillet_detail_view),
    path('<int:fillet_id>/delete/', fillet_delete_view),
]
