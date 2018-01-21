from django.conf import settings
from django.db import models

# Create your models here.


class Task(models.Model):
    class StatusChoices:
        Initiated = 'Initiated'
        Completed = 'Completed'
        Ignored = 'Ignored'
        Deferred = 'Deferred'

    status_choices = (
        (StatusChoices.Initiated, StatusChoices.Initiated),
        (StatusChoices.Completed, StatusChoices.Completed),
        (StatusChoices.Ignored, StatusChoices.Ignored),
        (StatusChoices.Deferred, StatusChoices.Deferred),)

    class PriorityChoices:
        High = 'High'
        Medium = 'Medium'
        Low = 'Low'

    priority_choices = (
        (PriorityChoices.High, PriorityChoices.High),
        (PriorityChoices.Low, PriorityChoices.Low),
        (PriorityChoices.Medium, PriorityChoices.Medium))

    title = models.CharField(blank=True, max_length=255)
    desc = models.TextField(blank=True)
    due_date = models.DateField(null=True)
    status = models.CharField(choices=status_choices, max_length=50, default=StatusChoices.Initiated)
    priority = models.CharField(choices=priority_choices, max_length=50, default=PriorityChoices.Medium)
    assigned_to = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.PROTECT, related_name='+')
    subscribers = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name='+')