from django.contrib import admin

from main.models import User, Company, TimeTable, Messages

# Register your models here.
admin.site.register(User)
admin.site.register(Company)
admin.site.register(TimeTable)
admin.site.register(Messages)
