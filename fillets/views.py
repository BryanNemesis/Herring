from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

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
    fillet_list = [{'id': x.id, 'text': x.text} for x in qs]
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
