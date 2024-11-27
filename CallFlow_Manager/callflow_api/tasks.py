# from celery import task
# from .models import Campaign, CampaignResult

# @task
# def create_campaign_results(campaign_id):
#     campaign = Campaign.objects.get(id=campaign_id)
#     for i in range(10):  # Simulate results for 10 calls
#         CampaignResult.objects.create(
#             name=f"Caller {i+1}",
#             type=campaign.type,
#             phone=f"+123456789{i}",
#             cost=1.5,
#             outcome="Success",
#             call_duration=5.0,
#             recording=f"http://example.com/recording_{i+1}",
#             summary="Call summary",
#             transcription="Call transcription",
#             campaign=campaign
#         )
