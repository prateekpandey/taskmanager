"""taskmanager URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url

# from rest_framework_swagger.views import get_swagger_view

# schema_view = get_swagger_view()

# from rest_framework_swagger.renderers import OpenAPIRenderer, SwaggerUIRenderer
# from rest_framework.decorators import api_view, renderer_classes
# from rest_framework import response, schemas


my_patterns = [
    path('admin/', admin.site.urls)]

#
# @api_view()
# @renderer_classes([SwaggerUIRenderer, OpenAPIRenderer])
# def schema_view(request):
#     generator = schemas.SchemaGenerator(title='API Docs', patterns=my_patterns, url='/api/v1/')
#     return response.Response(generator.get_schema())
#

urlpatterns = [
    url(r'^', include(my_patterns)),
    # url(r'^docs/', schema_view),
]