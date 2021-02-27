from django.db import models
from django.conf import settings
from django.db.models import Q


User = settings.AUTH_USER_MODEL


class FilletLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    fillet = models.ForeignKey('Fillet', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Like by {self.user} on {self.fillet}'


class FilletQuerySet(models.QuerySet):
    def feed(self, user):
        followed_user_profiles_exist = user.following.exists()
        followed_user_ids = []
        if followed_user_profiles_exist:
            followed_user_ids = user.following.values_list('user__id', flat=True)
        return self.filter(
            Q(user__id__in=followed_user_ids) |
            Q(user=user)
        ).distinct().order_by('-timestamp')


class FilletManager(models.Manager):
    def get_queryset(self, *args, **kwargs):
        return FilletQuerySet(self.model, using=self._db)

    def feed(self, user):
        return self.get_queryset().feed(user)


class Fillet(models.Model):
    parent = models.ForeignKey('self', null=True, on_delete=models.SET_NULL)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='fillets')
    text = models.TextField(blank=True, null=True)
    likes = models.ManyToManyField(User, related_name='fillet_user', blank=True, through=FilletLike)
    image = models.FileField('/images/costamn ', blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    objects = FilletManager()

    def __str__(self):
        if self.text:
            if len(self.text) > 20:
                return f'Fillet {self.id}: {self.text[:20]}...'
            else:
                return f'Fillet {self.id}: {self.text}'
        else:
            return f'Fillet {self.id} - repost'

    class Meta:
        ordering = ['-id']

    @property
    def is_repost(self):
        return self.parent is not None
