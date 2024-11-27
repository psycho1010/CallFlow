from rest_framework import viewsets, pagination
from .models import Agent, Campaign, CampaignResult
from .serializer import AgentSerializer, CampaignSerializer, CampaignResultSerializer
from rest_framework.filters import SearchFilter

class StandardResultsPagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class AgentViewSet(viewsets.ModelViewSet):
    queryset = Agent.objects.all()
    serializer_class = AgentSerializer
    pagination_class = StandardResultsPagination



class CampaignViewSet(viewsets.ModelViewSet):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer
    filter_backends = [SearchFilter]
    search_fields = ['status', 'type']


class CampaignResultViewSet(viewsets.ModelViewSet):
    queryset = CampaignResult.objects.all()
    serializer_class = CampaignResultSerializer
