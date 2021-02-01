import random

from django.conf import settings
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .serializers import (
    FilletSerializer,
    FilletCreateSerializer,
    FilletActionSerializer,
)
from .models import Fillet


def home_view(request):
    return render(request, 'pages/home.html')


@api_view(['GET'])
def fillet_list_view(request):
    qs = Fillet.objects.all()[:20]
    serializer = FilletSerializer(qs, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def fillet_detail_view(request, fillet_id):
    qs = Fillet.objects.filter(pk=fillet_id)
    if not qs.exists():
        return Response({}, status=404)
    obj = qs.first()
    serializer = FilletSerializer(obj)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def fillet_create_view(request):
    serializer = FilletCreateSerializer(data=request.POST)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response({}, status=400)


@api_view(['DELETE', 'POST'])
@permission_classes([IsAuthenticated])
def fillet_delete_view(request, fillet_id):
    qs = Fillet.objects.filter(pk=fillet_id)
    if not qs.exists():
        return Response({}, status=404)
    obj = qs.first()
    if obj.user != request.user:
        return Response({'message': f"You cannot delete fillet {obj} because you're not the author"}, status=403)
    obj.delete()
    return Response({'message': f'Fillet {obj} deleted successfully'}, status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def fillet_action_view(request):
    """
    id is required.
    action options are: like, unlike, repost.
    """
    serializer = FilletActionSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        fillet_id = data.get('id')
        action = data.get('action')
        repost_text = data.get('text')

        qs = Fillet.objects.filter(pk=fillet_id)
        if not qs.exists():
            return Response({}, status=404)
        obj = qs.first()

        if action == 'like':
            obj.likes.add(request.user)
            serializer = FilletSerializer(obj)
            return Response(serializer.data, status=200)
        elif action == 'unlike':
            obj.likes.remove(request.user)
        elif action == 'repost':
            repost = Fillet.objects.create(
                user=request.user,
                parent=obj,
                text=repost_text,
            )
            serializer = FilletSerializer(repost)
            return Response(serializer.data, status=200)
