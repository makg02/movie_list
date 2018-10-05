# movie_list
Movie List app

Documentation
-------------
- [Database Installation](#database-installation)
- [Running the React(Frontend)](#running-the-react)
- [Running the Django(Backend)](#running-the-django)

Database Installation
------------

Visit [CouchDB](http://couchdb.apache.org/#download) download the latest version based on your environment.

After the installation run python command line.

Then visit [http://127.0.0.1:5984](http://127.0.0.1: 5984)

```bash
>>> import couchdb
>>> s = couchdb.Server('http://admin:admin@127.0.0.1:5984')
>>> # create movies db
>>> s.create('movies')
```

Running the React
------------

Location the folder

```
cd movie-list
```

Install the dependencies

```
npm install
```


Start the frontend server

```
npm start
```

And visit [http://127.0.0.1:3000](http://127.0.0.1:3000)

Running the Django
------------

Location the folder

```
cd movies
```

Install the dependencies

```
pip install -r requirements.txt
```


Start the django server

```
python manage.py migrate
python manage.py syncdb
python manage.py runserver
```

And visit [http://127.0.0.1:8000](http://127.0.0.1:8000)
