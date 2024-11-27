from rest_framework import serializers
from .models import Agent, Campaign, CampaignResult
from rest_framework.exceptions import ValidationError
import re
# from .tasks import create_campaign_results

class AgentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agent
        fields = '__all__'

    def validate_phone_number(phone_number):
        pattern = r'^\+?1?\d{9,15}$'  # E.164 format
        if not re.match(pattern, phone_number):
            raise ValidationError("Invalid phone number format.")


class CampaignSerializer(serializers.ModelSerializer):
    agent = serializers.PrimaryKeyRelatedField(queryset=Agent.objects.all())

    class Meta:
        model = Campaign
        fields = ['id', 'campaign_name', 'type', 'phone_number', 'status', 'agent']

    def validate(self, data):
        agent = data.get('agent')
        if not agent:
            raise ValidationError("An associated agent is required for creating a campaign.")
        return data
    
    def create(self, validated_data):
        campaign = super().create(validated_data)
        # create_campaign_results.delay(campaign.id)  # Asynchronous task
        return campaign


class CampaignResultSerializer(serializers.ModelSerializer):
    campaign = serializers.PrimaryKeyRelatedField(
        queryset=Campaign.objects.all(),  # Enables assigning a campaign via its ID
        required=True
    )
    class Meta:
        model = CampaignResult
        fields = ['name', 'type', 'phone', 'cost', 'outcome', 'call_duration', 'recording', 'summary', 'transcription', 'campaign']


