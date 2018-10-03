import couchdb
import json
from pprint import pprint
from django.shortcuts import get_object_or_404, render
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

        movie_titles = sorted(movie_titles, key=lambda k: k['title'])
        return HttpResponse(json.dumps(movie_titles))


class AddMovie(View):

    def post(self, request):

        if request.method == 'POST':

            #pprint(request.body)
            data = json.loads(request.body)
            try:
                doc_id, rev = DB_MOVIES.save(data)
            except:
                print "something happen"

            return HttpResponse(json.dumps(doc_id))


class UpdateMovie(View):

    def post(self, request):

        if request.method == 'POST':

            data = json.loads(request.body)
            doc_id = data.get('_id')
            doc = DB_MOVIES.get(doc_id)
            doc['title'] = data.get('title')
            doc['description'] = data.get('description')

            try:
                docid, rev = DB_MOVIES.save(doc)
            except:
                print "something happen"

            return HttpResponse(json.dumps(rev))


class DeleteMovie(View):

    def delete(self, request, movie_id):
        try:
            doc = DB_MOVIES.get(movie_id)
            doc['is_active'] = False
            DB_MOVIES.save(doc)
            return HttpResponse(json.dumps('ok'))
        except:
            return HttpResponse(json.dumps('error'))
