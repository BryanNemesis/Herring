from django.shortcuts import render


def fillet_list_view(request):
    return render(request, 'fillets/list.html')

def fillet_detail_view(request, fillet_id):
    return render(request, 'fillets/detail.html', context={'fillet_id': fillet_id})
