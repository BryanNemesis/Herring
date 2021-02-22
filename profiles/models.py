from django.conf import settings
from django.db import models
from django.db.models.signals import post_save


User = settings.AUTH_USER_MODEL
 
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    country = models.CharField(max_length=50, null=True, blank=True)
    bio = models.TextField(max_length=2000, null=True, blank=True)

    def __str__(self):
        return f'{self.id}: Profile of user {self.user.username}'


def user_did_save(sender, instance, created, *args, **kwargs):
    Profile.objects.get_or_create(user=instance)

post_save.connect(user_did_save, User)