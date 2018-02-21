from rest_framework import generics

from auth.authentication import TokenAuthentication
from auth.mixins import AuthenticatedViewMixin
from task.models import Task
from task.serializers import TaskSerializer


class TaskView(AuthenticatedViewMixin, generics.ListCreateAPIView):
	serializer_class = TaskSerializer
	queryset = Task.objects.all()
	filter_fields = ('title', 'desc', 'due_date', 'status', 'priority', 'created_by', 'assigned_to', 'created_by')
	search_fields = ('title', 'desc')
	ordering_fields = ('due_date', 'created_on')


class TaskDetailView(AuthenticatedViewMixin, generics.RetrieveUpdateDestroyAPIView):
	serializer_class = TaskSerializer
	queryset = Task.objects.all()
	authentication_classes = (TokenAuthentication, )

	def get_object(self):
		obj = super().get_object()
		return obj

	def get(self, request, *args, **kwargs):
		return super().get(request, *args)


class MyTaskView(TaskView):

	def filter_queryset(self, queryset):
		# super().filter_queryset(queryset).filter(user=assigned_to)
		return queryset


class MyTaskDetailView(TaskDetailView):

	def filter_queryset(self, queryset):
		# super().filter_queryset(queryset).filter(user=assigned_to)
		return queryset
