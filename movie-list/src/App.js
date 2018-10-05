
import React from 'react';
//import logo from './logo.svg';
import './App.css';

import AddMovie from './AddMovie.js'
import MovieAppBar from './MovieAppBar.js'
import MovieLists from './MovieLists.js'
import MovieDetail from './MovieDetail'
import UpdateMovie from './UpdateMovie'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'





const App = () => (
  <Router>
    <div>
      <MovieAppBar />
      <Route exact path="/" component={MovieLists}/>
      <Route path="/add" component={AddMovie}/>
      <Route path="/update/:id" component={UpdateMovie} />
      <Route path="/view/:id" component={MovieDetail} />

    </div>
  </Router>
)


export default App;
