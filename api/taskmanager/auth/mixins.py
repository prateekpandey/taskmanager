from django.core.exceptions import FieldError

from auth.authentication import TokenAuthentication
from auth.permissions import IsStaff


class AuthenticatedViewMixin(object):
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsStaff,)

	def get_serializer(self, *args, **kwargs):
		serializer = super().get_serializer(*args, **kwargs)

		user = self.request.user
		assert user, 'auth_user_should_exist'

		serializer.auth_user = user
		return serializer

	def get_queryset(self):
		query_set = super().get_queryset()
		try:
			return query_set.filter(user=self.request.user)
		except FieldError:
			return query_set