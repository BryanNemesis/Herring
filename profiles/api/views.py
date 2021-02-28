from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from ..serializers import PublicProfileSerializer
from ..models import Profile

from django.contrib.auth import get_user_model

User = get_user_model()


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_follow_view(request, username):
    me = request.user
    other_user_qs = User.objects.filter(username=username)
    if me.username == username:
        my_followers = me.profile.followers.all()
        return Response({'count': my_followers.count()}, status=200)
    if not other_user_qs.exists():
        return Response({}, status=404)
    other_user = other_user_qs.first()
    followers = other_user.profile.followers
    data = request.data or {}
    action = data.get('action')
    if action == 'follow':
        followers.add(me)
    elif action == 'unfollow':
        followers.remove(me)

    current_followers_qs = followers.all()

    return Response({'count': current_followers_qs.count()}, status=200)
    
@api_view(['GET'])
def profile_detail_api_view(request, username):
    qs = Profile.objects.filter(user__username=username)
    if not qs.exists():
        return Response({'detail': 'User not found'}, status=404)
    profile_obj = qs.first()

    data = PublicProfileSerializer(instance=profile_obj, context={'request': request})
    return Response(data.data)
