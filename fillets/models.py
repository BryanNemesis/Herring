from django.db import models
import random


class Fillet(models.Model):
    text = models.TextField(blank=True, null=True)
    image = models.FileField('/images/costamn ', blank=True, null=True)

    def serialize(self):
        return {
            'id': self.id,
            'text': self.text,
            'likes': random.randint(0, 1000),
        }
