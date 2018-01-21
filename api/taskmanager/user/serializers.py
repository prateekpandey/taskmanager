from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.exceptions import ValidationError


class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = get_user_model()
		fields = ('first_name', 'last_name', 'email')


class SignupSerializer(serializers.ModelSerializer):
	class Meta:
		model = get_user_model()
		fields = ('first_name', 'last_name', 'email', 'password')

	def validate_email(self, value):
		user_model = get_user_model()
		if user_model.objects.filter(email=value):
			raise ValidationError("User with given Email already exists.")
		return value

	def create(self, validated_data):
		if 'email' not in validated_data or 'password' not in validated_data:
			raise ValidationError('Email and Password are required Fields')
		validated_data['username'] = validated_data['email']
		validated_data['is_staff'] = True
		return get_user_model().objects.create_user(**validated_data)


class LoginSerializer(serializers.ModelSerializer):
	class Meta:
		model = get_user_model()
		fields = ('email', 'password')
