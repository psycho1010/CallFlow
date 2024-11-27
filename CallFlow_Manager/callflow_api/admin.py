

# Register your models here.
from django.contrib import admin
from .models import Agent, Campaign, CampaignResult

admin.site.register(Agent)
admin.site.register(Campaign)
admin.site.register(CampaignResult)
