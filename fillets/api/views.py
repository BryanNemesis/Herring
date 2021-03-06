from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated

from ..serializers import (
    FilletSerializer,
    FilletCreateSerializer,
    FilletActionSerializer,
)
from ..models import Fillet


@api_view(['GET'])
def fillet_list_view(request):
    qs = Fillet.objects.all()
    username = request.GET.get('username')
    if username:
        qs = qs.filter(user__username__iexact=username)
    return get_paginated_qs_response(qs, request)


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
    serializer = FilletCreateSerializer(data=request.data)
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
            serializer = FilletSerializer(obj)
            return Response(serializer.data, status=200)
        elif action == 'repost':
            repost = Fillet.objects.create(
                user=request.user,
                parent=obj,
                text=repost_text,
            )
            serializer = FilletSerializer(repost)
            return Response(serializer.data, status=201)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def fillet_feed_view(request):
    qs = Fillet.objects.feed(request.user)
    return get_paginated_qs_response(qs, request)


def get_paginated_qs_response(qs, request, page_size=10):
    paginator = PageNumberPagination()
    paginator.page_size = page_size
    paginated_qs = paginator.paginate_queryset(qs, request)
    serializer = FilletSerializer(paginated_qs, many=True)
    return paginator.get_paginated_response(serializer.data)