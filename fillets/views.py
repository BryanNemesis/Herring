import random

from django.conf import settings
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.utils.http import is_safe_url

from .forms import FilletForm
from .models import Fillet


def home_view(request, *args, **kwarg):
    return render(request, 'pages/home.html')


def fillet_list_view(request, *args, **kwargs):
    """
    REST API view
    Consumed by js
    Return json data
    """
    qs = Fillet.objects.all()
    fillet_list = [x.serialize() for x in qs]
    data = {
        'isUser': False,
        'response': fillet_list,
    }
    return JsonResponse(data)


def fillet_detail_view(request, fillet_id, *args, **kwargs):
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


def fillet_create_view(request, *args, **kwargs):
    form = FilletForm(request.POST or None)
    next_url = request.POST.get('next') or None
    if form.is_valid():
        obj = form.save()
        if request.is_ajax():
            return JsonResponse(obj.serialize(), status=201)
        if next_url is not None and is_safe_url(next_url, settings.ALLOWED_HOSTS):
            return redirect(next_url)
    if form.errors:
        if request.is_ajax():
            return JsonResponse(form.errors, status=400)
