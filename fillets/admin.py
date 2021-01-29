from django.contrib import admin

from .models import Fillet


class FilletAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'id', 'user']
    search_fields = ['user__username', 'user__email']

    class Meta:
        model = Fillet


admin.site.register(Fillet, FilletAdmin)
