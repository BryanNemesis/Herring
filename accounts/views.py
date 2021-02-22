from django.shortcuts import render, redirect
from django.contrib.auth import login, logout
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm


def login_view(request):
    form = AuthenticationForm(request, data=request.POST or None)
    if form.is_valid():
        user = form.get_user()
        login(request, user)
        return redirect('/')
    context = {
        'form': form,
        'btn_label': 'Login',
        'title': 'Login',
        'description': 'Hello again! Please login to enjoy Herring.'
    }
    return render(request, 'accounts/auth.html', context)

def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return redirect('/login')
    context = {
        'form': None,
        'btn_label': 'Yes',
        'title': 'Logout',
        'description': 'Are you sure you want to log out?'
    }
    return render(request, 'accounts/auth.html', context)

def register_view(request):
    form = UserCreationForm(request.POST or None)
    if form.is_valid():
        user = form.save()
        user.set_password (form.cleaned_data.get('password1'))
        return redirect('/login')
    context = {
        'form': form,
        'btn_label': 'Register',
        'title': 'Register',
        'description': 'Create an account to enjoy some Herring with your friends.'
    }
    return render(request, 'accounts/auth.html', context)
