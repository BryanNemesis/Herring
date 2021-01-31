from django.db import models
from django.conf import settings

import random


User = settings.AUTH_USER_MODEL


class FilletLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    fillet = models.ForeignKey('Fillet', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Like by {self.user} on {self.fillet}'


class Fillet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField(blank=True, null=True)
    likes = models.ManyToManyField(User, related_name='fillet_user', blank=True, through=FilletLike)
    image = models.FileField('/images/costamn ', blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if len(self.text) > 20:
            return f'Fillet {self.id}: {self.text[:20]}...'
        else:
            return f'Fillet {self.id}: {self.text}'

    class Meta:
        ordering = ['-id']

    def serialize(self):
        return {
            'id': self.id,
            'text': self.text,
            'like_count': random.randint(0, 1000),
        }
