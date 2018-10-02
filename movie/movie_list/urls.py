from django.conf.urls import url
from movie_list.views import MovieLists, AddMovie

urlpatterns = [
    url(r'^$', MovieLists.as_view()),
    url(r'^/add$', AddMovie.as_view())
]
