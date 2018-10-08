import couchdb
import json
from pprint import pprint
from django.conf import settings
from django.contrib.sessions.backends.db import SessionStore
from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from django.views.generic import View
from movie import settings
from datetime import datetime
import time
from datetime import datetime, timedelta, date
from pytz import timezone

s = couchdb.Server(settings.COUCH_DSN)

DB_MOVIES = s['movies']

# Create your views here.


class MovieLists(View):


    def get(self, request):

        tz = timezone('Asia/Manila')
        now = tz.localize(datetime.now()).strftime("%B %d %Y %H:%M:%S")
        return_data = {}


        session_store = SessionStore()


        if not session_store.has_key('last_visit'):
            #print False
            return_data['is_visit'] = False
            session_store['last_visit'] = now
            session_store.save()


        if session_store['last_visit'] != None:
            print True
            #session_store.pop('last_visit')
            return_data['is_visit'] = True
            return_data['last_visit_time'] = session_store.get('last_visit')
            session_store['last_visit'] = now
            session_store.save()

        view = DB_MOVIES.view('_all_docs', include_docs=True)
        movie_titles = []
        for r in view:
            doc = r.doc
            if doc.get('is_active') == True:
                movie_titles.append(doc.copy())

        #print "movie list :%s " % x['last_visit']
        movies = sorted(movie_titles, key=lambda k: k['title'].lower())

        return_data['movies'] = movies
        return HttpResponse(json.dumps(return_data), 'application/json')


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
