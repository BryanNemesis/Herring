import random

from django.conf import settings
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.utils.http import is_safe_url
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .forms import FilletForm
from .serializers import FilletSerializer, FilletActionSerializer
from .models import Fillet


def home_view(request, *args, **kwarg):
    return render(request, 'pages/home.html')


@api_view(['GET'])
def fillet_list_view(request, *args, **kwargs):
    qs = Fillet.objects.all()[:20]
    serializer = FilletSerializer(qs, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def fillet_detail_view(request, fillet_id, *args, **kwargs):
    qs = Fillet.objects.filter(pk=fillet_id)
    if not qs.exists():
        return Response({}, status=404)
    obj = qs.first()
    serializer = FilletSerializer(obj)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def fillet_create_view(request, *args, **kwargs):
    serializer = FilletSerializer(data=request.POST)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response({}, status=400)


@api_view(['DELETE', 'POST'])
@permission_classes([IsAuthenticated])
def fillet_delete_view(request, fillet_id, *args, **kwargs):
    qs = Fillet.objects.filter(pk=fillet_id)
    if not qs.exists():
        return Response({}, status=404)
    obj = qs.first()
    if obj.user != request.user:
        return Response({'message': f"You cannot delete fillet {obj} because you're not the author"}, status=403)
    obj.delete()
    return Response({'message': f'Fillet {obj} deleted successfully'}, status=200)


def fillet_list_view_pure_django(request, *args, **kwargs):
    """
    REST API view
    Consumed by js
    Return json data
    """
    qs = Fillet.objects.all()[:20]
    fillet_list = [x.serialize() for x in qs]
    data = {
        'isUser': False,
        'response': fillet_list,
    }
    return JsonResponse(data)


def fillet_detail_view_pure_django(request, fillet_id, *args, **kwargs):
    """
    REST API view
    Consumed by js
    Return json data
    """
    data = {
        "id": fillet_id,
    }

    status = 200
    try:
        obj = Fillet.objects.get(id=fillet_id)
        data['text'] = obj.text
    except Fillet.DoesNotExist:
        data['message'] = 'Not found'
        status = 404

    return JsonResponse(data, status=status)


def fillet_create_view_pure_django(request, *args, **kwargs):
    if not request.user.is_authenticated:
        if request.is_ajax():
            return JsonResponse({}, status=403)
    form = FilletForm(request.POST or None)
    next_url = request.POST.get('next') or None
    if form.is_valid():
        obj = form.save(commit=False)
        obj.user = request.user
        obj.save()
        if request.is_ajax():
            return JsonResponse(obj.serialize(), status=201)
        if next_url is not None and is_safe_url(next_url, settings.ALLOWED_HOSTS):
            return redirect(next_url)
    if form.errors:
        if request.is_ajax():
            return JsonResponse(form.errors, status=400)

