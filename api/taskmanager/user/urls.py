from django.conf.urls import url
from user import views

urlpatterns = [

    url(r'^signup/$', views.SignupView.as_view(), name='signup-view'),
    url(r'^login/$', views.LoginView.as_view(), name='login-view'),
    url(r'^logout/$', views.LogoutView.as_view(), name='logout-view'),

    # # todo review might not be required
    # url(r'^my-tasks/$', views.MyTaskView.as_view(), name='my-task-view'),
    # url(r'^my-tasks/(?P<pk>[0-9]+)/$', views.MyTaskDetailView.as_view(), name='my-task-detail-view'),
]
