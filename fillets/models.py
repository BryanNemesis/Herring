from django.db import models


class Fillet(models.Model):
    text = models.TextField(blank=True, null=True)
    image = models.FileField('/images/costamn ', blank=True, null=True)
