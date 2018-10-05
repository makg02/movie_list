from django.conf.urls import url
from movie_list.views import MovieLists, AddMovie, UpdateMovie, DeleteMovie, ViewMovie, LikeMovie

urlpatterns = [
    url(r'^$', MovieLists.as_view()),
    url(r'^/add', AddMovie.as_view(), name="add_movie"),
    url(r'^/update', UpdateMovie.as_view(), name="update_movie"),
    url(r'^/like', LikeMovie.as_view(), name="like" ),
    url(r'^/view/(?P<movie_id>[0-9a-f-]+)', ViewMovie.as_view(), name="view_movie" ),
    url(r'^/delete/(?P<movie_id>[0-9a-f-]+)', DeleteMovie.as_view(), name="delete_movie" )
]
