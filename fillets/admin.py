from django.contrib import admin

from .models import Fillet, FilletLike


class FilletLikeAdmin(admin.TabularInline):
    model = FilletLike


class FilletAdmin(admin.ModelAdmin):
    inlines = [FilletLikeAdmin]
    list_display = ['__str__', 'id', 'user']
    search_fields = ['user__username', 'user__email']

    class Meta:
        model = Fillet


admin.site.register(Fillet, FilletAdmin)
