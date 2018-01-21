from django.conf.urls import url
from task import views

urlpatterns = [

    url(r'^', views.TaskView.as_view(), name='task-view'),
    url(r'^(?P<pk>[0-9]+)/$', views.TaskDetailView.as_view(), name='task-detail-view'),

    # todo review might not be required
    # url(r'^my-tasks/$', views.MyTaskView.as_view(), name='my-task-view'),
    # url(r'^my-tasks/(?P<pk>[0-9]+)/$', views.MyTaskDetailView.as_view(), name='my-task-detail-view'),
]
