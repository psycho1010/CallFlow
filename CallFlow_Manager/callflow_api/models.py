from django.db import models

# Create your models here.

class Agent(models.Model):
    agent_name = models.CharField(max_length=255)
    language = models.CharField(max_length=100)
    voice_id = models.CharField(max_length=100)
    updated = models.DateTimeField(auto_now=True)


class Campaign(models.Model):
    INBOUND = 'Inbound'
    OUTBOUND = 'Outbound'
    STATUS_CHOICES = [
        ('Running', 'Running'),
        ('Paused', 'Paused'),
        ('Completed', 'Completed'),
    ]
    campaign_name = models.CharField(max_length=255)
    type = models.CharField(max_length=50, choices=[(INBOUND, 'Inbound'), (OUTBOUND, 'Outbound')])
    phone_number = models.CharField(max_length=15)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES)
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE, related_name='campaigns')


class CampaignResult(models.Model):
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    cost = models.FloatField()
    outcome = models.CharField(max_length=100)
    call_duration = models.FloatField()
    recording = models.URLField(blank=True, null=True)
    summary = models.TextField(blank=True)
    transcription = models.TextField(blank=True)
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE, related_name='results')
