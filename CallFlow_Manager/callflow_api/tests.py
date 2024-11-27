from rest_framework.test import APITestCase
from rest_framework import status
from .models import Agent, Campaign, CampaignResult
from django.urls import reverse

class AgentAPITestCase(APITestCase):
    def setUp(self):
        self.agent_data = {
            "agent_name": "John Doe",
            "language": "English",
            "voice_id": "voice_123"
        }
        self.agent = Agent.objects.create(**self.agent_data)

    def test_agent_list(self):
        response = self.client.get('/api/agents/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_agent_create(self):
        response = self.client.post('/api/agents/', {
            "agent_name": "Jane Smith",
            "language": "Spanish",
            "voice_id": "voice_456"
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_agent_update(self):
        response = self.client.put(f'/api/agents/{self.agent.id}/', {
            "agent_name": "John Updated",
            "language": "English",
            "voice_id": "voice_789"
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_agent_delete(self):
        response = self.client.delete(f'/api/agents/{self.agent.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

class CampaignAPITestCase(APITestCase):

    def setUp(self):
        # Create an agent to associate with campaigns
        self.agent = Agent.objects.create(
            agent_name="John Doe",
            language="English",
            voice_id="voice_123"
        )
        self.campaign_data = {
            "campaign_name": "Test Campaign",
            "type": "Inbound",
            "phone_number": "+1234567890",
            "status": "Running",
            "agent": self.agent.id
        }

    def test_create_campaign(self):
        url = reverse('campaign-list')  # Assuming 'campaign-list' is your viewset's name in urls.py
        response = self.client.post(url, self.campaign_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['campaign_name'], "Test Campaign")

    def test_retrieve_campaign(self):
        campaign = Campaign.objects.create(**self.campaign_data)
        url = reverse('campaign-detail', args=[campaign.id])  # Assuming 'campaign-detail' is your viewset's name
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['campaign_name'], "Test Campaign")

    def test_update_campaign(self):
        campaign = Campaign.objects.create(**self.campaign_data)
        url = reverse('campaign-detail', args=[campaign.id])
        updated_data = {
            "campaign_name": "Updated Campaign",
            "type": "Outbound",
            "phone_number": "+9876543210",
            "status": "Paused",
            "agent": self.agent.id
        }
        response = self.client.put(url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['campaign_name'], "Updated Campaign")

    def test_delete_campaign(self):
        campaign = Campaign.objects.create(**self.campaign_data)
        url = reverse('campaign-detail', args=[campaign.id])
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Campaign.objects.filter(id=campaign.id).exists())

class CampaignResultAPITestCase(APITestCase):

    def setUp(self):
        # Create an agent and a campaign to associate with campaign results
        self.agent = Agent.objects.create(
            agent_name="John Doe",
            language="English",
            voice_id="voice_123"
        )
        self.campaign = Campaign.objects.create(
            campaign_name="Test Campaign",
            type="Inbound",
            phone_number="+1234567890",
            status="Running",
            agent=self.agent
        )
        self.campaign_result_data = {
            "name": "Caller 1",
            "type": "Inbound",
            "phone": "+1234567891",
            "cost": 2.5,
            "outcome": "Success",
            "call_duration": 5.0,
            "recording": "http://example.com/recording_1",
            "summary": "Call summary",
            "transcription": "Call transcription",
            "campaign": self.campaign.id
        }

    def test_create_campaign_result(self):
        url = reverse('campaignresult-list')  # Assuming 'campaignresult-list' is your viewset's name
        response = self.client.post(url, self.campaign_result_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], "Caller 1")

    def test_retrieve_campaign_result(self):
        campaign_result = CampaignResult.objects.create(**self.campaign_result_data)
        url = reverse('campaignresult-detail', args=[campaign_result.id])  # Assuming 'campaignresult-detail'
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], "Caller 1")

    def test_update_campaign_result(self):
        campaign_result = CampaignResult.objects.create(**self.campaign_result_data)
        url = reverse('campaignresult-detail', args=[campaign_result.id])
        updated_data = {
            "name": "Updated Caller",
            "type": "Outbound",
            "phone": "+9876543210",
            "cost": 3.5,
            "outcome": "Failed",
            "call_duration": 7.0,
            "recording": "http://example.com/recording_2",
            "summary": "Updated call summary",
            "transcription": "Updated transcription",
            "campaign": self.campaign.id
        }
        response = self.client.put(url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], "Updated Caller")

    def test_delete_campaign_result(self):
        campaign_result = CampaignResult.objects.create(**self.campaign_result_data)
        url = reverse('campaignresult-detail', args=[campaign_result.id])
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(CampaignResult.objects.filter(id=campaign_result.id).exists())
