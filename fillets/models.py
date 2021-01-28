from django.db import models
import random


class Fillet(models.Model):
    text = models.TextField(blank=True, null=True)
    image = models.FileField('/images/costamn ', blank=True, null=True)

    class Meta:
        ordering = ['-id']

    def serialize(self):
        return {
            'id': self.id,
            'text': self.text,
            'like_count': random.randint(0, 1000),
        }
