from django.utils import timezone
from django.contrib.auth import get_user_model, backends
from rest_framework.authentication import TokenAuthentication as BaseTokenAuthentication

from auth.models import Token
from rest_framework import exceptions


class TokenAuthentication(BaseTokenAuthentication):
	"""
	a substitute for rest_framework.authentication.TokenAuthentication class. It checks the expiry date
	of key as part of validation.
	"""
	model = Token

	# def authenticate_credentials(self, key):
	# 	try:
	# 		token = self.model.objects.select_related('user').get(key=key)
	# 	except self.model.DoesNotExist:
	# 		raise exceptions.AuthenticationFailed('Invalid Token')
	#
	# 	if timezone.now().__gt__(token.expiry):
	# 		raise exceptions.AuthenticationFailed('Token Expired')
	#
	# 	if not token.user.is_active:
	# 		raise exceptions.AuthenticationFailed('Account Disabled')
	#
	# 	return token.user, token


class DRFAuthBackend(backends.ModelBackend):
	"""
	override the authenticate method to implement DTR login mechanism.
	"""
	def authenticate(self, username=None, password=None, **kwargs):
		UserModel = get_user_model()
		try:
			if username:
				user = UserModel.objects.get(username=username)
			else:
				user = UserModel.objects.get(**kwargs)
			if user.check_password(password):
				return user
		except UserModel.DoesNotExist:
			# Run the default password hasher once to reduce the timing
			# difference between an existing and a non-existing user (#20760).
			UserModel().set_password(password)
