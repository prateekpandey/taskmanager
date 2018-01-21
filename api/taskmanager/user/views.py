from django.contrib.auth import login, authenticate, get_user_model
from rest_framework import generics, status
from django.conf import settings
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response

from auth import mixins
from auth.models import Token
from user.serializers import SignupSerializer, LoginSerializer, UserSerializer

user_model = settings.AUTH_USER_MODEL


class SignupView(generics.CreateAPIView):
	queryset = get_user_model().objects.all()
	serializer_class = SignupSerializer

	def create(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = serializer.save()

		# may add handle for client-id or client-token&
		token, created = Token.objects.get_or_create(user=user)
		return Response({'token': token.key, 'user': UserSerializer(user).data}, status=status.HTTP_200_OK)


class LoginView(generics.CreateAPIView):
	queryset = get_user_model().objects.all()
	serializer_class = LoginSerializer

	def create(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = authenticate(request, username=serializer.validated_data['email'], password=serializer.validated_data['password'])
		if user is None:
			raise ValidationError(detail="Email or Password is Incorrect")

		# may add handle for client-id or client-token&
		token, created = Token.objects.get_or_create(user=user)
		return Response({'token': token.key, 'user': UserSerializer(user).data}, status=status.HTTP_200_OK)


class LogoutView(mixins.AuthenticatedViewMixin, generics.GenericAPIView):

	def post(self, request, *args, **kwargs):
		"""
		Logs out the currently authenticated user identified by the auth-token in header, from current or all devices
		---
		parameters:
			- name: logout_all
			  description: set it to true if user wants to log out from all logged in devices.
			  type: string
			  paramType: query
		"""
		# delete current token
		request.auth.delete()

		return Response({'detail': 'Successfully Logged Out'}, status=status.HTTP_200_OK)
