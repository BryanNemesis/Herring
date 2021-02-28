from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from ..serializers import PublicProfileSerializer
from ..models import Profile

from django.contrib.auth import get_user_model

User = get_user_model()

    
@api_view(['GET', 'POST'])
def profile_detail_api_view(request, username):
    qs = Profile.objects.filter(user__username=username)
    if not qs.exists():
        return Response({'detail': 'User not found'}, status=404)
    profile_obj = qs.first()
    me = request.user

    if request.method == 'POST' and profile_obj.user != me:
        data = request.data or {}
        action = data.get('action')
        if action == 'follow':
            profile_obj.followers.add(me)
        elif action == 'unfollow':
            profile_obj.followers.remove(me)

    serializer = PublicProfileSerializer(instance=profile_obj, context={'request': request})
    return Response(serializer.data)
