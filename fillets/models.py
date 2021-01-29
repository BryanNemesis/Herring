from django.db import models
from django.conf import settings


User = settings.AUTH_USER_MODEL


class Fillet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField(blank=True, null=True)
    image = models.FileField('/images/costamn ', blank=True, null=True)

    def __str__(self):
        if len(self.text) > 30:
            return self.text[:30] + '...'
        else:
            return self.text

    class Meta:
        ordering = ['-id']

    def serialize(self):
        return {
            'id': self.id,
            'text': self.text,
            'like_count': random.randint(0, 1000),
        }
