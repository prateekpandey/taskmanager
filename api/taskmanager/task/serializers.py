from rest_framework import serializers

from task.models import Task


class TaskSerializer(serializers.ModelSerializer):
	class Meta:
		model = Task
		fields = '__all__'

	def is_valid(self, raise_exception=False):
		self.initial_data['created_by'] = self.auth_user.pk
		super().is_valid(self)
