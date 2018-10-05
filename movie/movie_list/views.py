import couchdb
import json
from pprint import pprint
from django.contrib.sessions.backends.db import SessionStore
from django.shortcuts import get_object_or_404, render
from django.shortcuts import render, HttpResponse
from django.views.generic import View
from movie import settings
from datetime import datetime

s = couchdb.Server(settings.COUCH_DSN)

DB_MOVIES = s['movies']

# Create your views here.


class MovieLists(View):

    def get(self, request):



        if 'movies' not in s:
            db = s.create('movies')
            return HttpResponse(json.dumps('succesfully create movies db'), 'application/json')

        view = DB_MOVIES.view('_all_docs', include_docs=True)
        movie_titles = []
        for r in view:
            doc = r.doc
            if doc.get('is_active') == True:
                movie_titles.append(doc.copy())

        movies = sorted(movie_titles, key=lambda k: k['title'].lower())

        #pprint(movies)
        return HttpResponse(json.dumps(movies), 'application/json')


class AddMovie(View):

    def post(self, request):

        if request.method == 'POST':

            #pprint(request.body)
            data = json.loads(request.body)
            try:
                doc_id, rev = DB_MOVIES.save(data)
            except:
                print "something happen"

            return HttpResponse(json.dumps(doc_id), 'application/json')


class ViewMovie(View):

    def get(self, request, movie_id):
        doc = DB_MOVIES.get(movie_id)
        return HttpResponse(json.dumps(doc), 'application/json')

class UpdateMovie(View):

    def post(self, request):

        if request.method == 'POST':

            data = json.loads(request.body)
            doc_id = data.get('_id')
            doc = DB_MOVIES.get(doc_id)
            doc['title'] = data.get('title')
            doc['description'] = data.get('description')
            doc['is_active'] = data.get('is_active')

            try:
                docid, rev = DB_MOVIES.save(doc)
            except:
                print "something happen"

            return HttpResponse(json.dumps(docid), 'application/json')


class DeleteMovie(View):

    def delete(self, request, movie_id):
        try:
            doc = DB_MOVIES.get(movie_id)
            doc['is_active'] = False
            DB_MOVIES.save(doc)
            #return HttpResponse(json.dumps('ok'), 'application/json')
        except:
            print 'something happen'


        view = DB_MOVIES.view('_all_docs', include_docs=True)
        movies = []
        for r in view:
            doc = r.doc
            if doc.get('is_active') == True:
                movies.append(doc.copy())

        movies = sorted(movies, key=lambda k: k['title'].lower())
        return HttpResponse(json.dumps(movies), 'application/json')

class LikeMovie(View):

    def post(self, request):

        if request.method == 'POST':
            data = json.loads(request.body)

            pprint(data)
            doc_id = data.get('_id')
            like = data.get('like')
            doc = DB_MOVIES.get(doc_id)
            doc['like'] = like

            try:
                doc = DB_MOVIES.save(doc)
            except:
                print 'something happen'


            view = DB_MOVIES.view('_all_docs', include_docs=True)
            movies = []
            for r in view:
                doc = r.doc
                if doc.get('is_active') == True:
                    movies.append(doc.copy())

            movies = sorted(movies, key=lambda k: k['title'].lower())
            return HttpResponse(json.dumps(movies), 'application/json')
