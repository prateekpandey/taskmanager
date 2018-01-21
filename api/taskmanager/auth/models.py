import binascii
import os
from datetime import timedelta

from django.db import models
from django.conf import settings
from django.utils import timezone


class Token(models.Model):
	"""
	model for auth token. inspired by rest_framework.authtoken.models.Token
	"""
	key = models.CharField(max_length=40, primary_key=True)
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	created = models.DateTimeField(auto_now_add=True)
	expiry = models.DateTimeField()

	class Meta:
		db_table = 'token'

	def __str__(self):
		return self.key

	def build(self):
		self.key = Token.generate_key()
		self._set_expiry(30)

	def save(self, *args, **kwargs):
		if not self.key:
			self.build()
		return super().save(*args, **kwargs)

	def refresh(self, save=True):
		self._set_expiry(30, save=save)
		return self.key

	def expire(self, save=True):
		self._set_expiry(0, save=save)
		return None

	def _set_expiry(self, life_time, save=False):
		self.expiry = timezone.now() + timedelta(days=life_time)
		if save:
			self.save()

	@staticmethod
	def generate_key():
		return binascii.hexlify(os.urandom(20)).decode()
