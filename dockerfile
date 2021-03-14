# pull official base image
FROM python:3.9-alpine

# set work directory
WORKDIR /app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV DEBUG 0

# install dependencies
COPY ./requirements.txt .
RUN \
 apk add --no-cache postgresql-libs && \
 apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev && \
 python -m pip install -r requirements.txt --no-cache-dir && \
 apk --purge del .build-deps

# copy project
COPY . .

# collect static files
RUN python manage.py collectstatic --noinput

# add and run as non-root user
RUN adduser -D myuser
RUN chown -R myuser /app
USER myuser

# run migrations and tests, create superuser
RUN python manage.py makemigrations 
RUN python manage.py migrate
RUN python manage.py test
RUN echo "from django.contrib.auth import get_user_model;\
 User = get_user_model();\
 User.objects.create_superuser('bryan', '', 'maiden')"\
 | python manage.py shell
