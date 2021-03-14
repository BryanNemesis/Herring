#!/bin/sh

python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic --noinput
echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('bryan', '', 'maiden')" | python manage.py shell
