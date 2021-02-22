from django.http import Http404
from django.shortcuts import render, redirect

from .forms import ProfileForm
from .models import Profile

def profile_detail_view(request, username):
    qs = Profile.objects.filter(user__username=username)
    if not qs.exists():
        raise Http404
    profile_obj = qs.first()
    context = {
        'username': username,
        'profile': profile_obj,
    }
    return render(request, 'profiles/detail.html', context)

def profile_update_view(request):
    if not request.user.is_authenticated:
        redirect('/login?next=/profile/update')
    user = request.user
    profile = user.profile
    initial = {
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
    }
    form = ProfileForm(request.POST or None, instance=profile, initial=initial)
    if form.is_valid():
        first_name = form.cleaned_data.get('first_name')
        last_name = form.cleaned_data.get('last_name')
        email = form.cleaned_data.get('email')
        # add some stuff for User model as well.
        user.first_name = first_name
        user.last_name = last_name
        user.email = email
        user.save()
        form.save()

    context = {
        'form': form,
        'btn_label': 'Save',
        'title': 'Update profile',
        'description': 'Here you can fill out your data.',
    }
    return render(request, 'profiles/form.html', context)
