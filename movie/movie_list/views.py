import couchdb
import json
from django.shortcuts import render, HttpResponse
from django.views.generic import View
from movie import settings

s = couchdb.Server(settings.COUCH_DSN)

DB_MOVIES = s['movies']
# Create your views here.
class MovieLists(View):

    def get(self, request):

        view = DB_MOVIES.view('management/titles', include_docs=True)

        movie_titles = []
        for r in view:
            doc = r.doc
            movie_titles.append(doc.copy())


        return HttpResponse(json.dumps(movie_titles))

class AddMovie(View):

    def get(self, request):
        print settings.COUCH_DSN
        return HttpResponse('add')
