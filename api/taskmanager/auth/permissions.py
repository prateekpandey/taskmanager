from rest_framework.permissions import IsAuthenticated


class IsStaff(IsAuthenticated):
	"""
	permission class to set staff permission.
	"""
	def has_permission(self, request, view):
		if super().has_permission(request, view):
			return request.user.is_staff