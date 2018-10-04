
import React from 'react';
//import logo from './logo.svg';
import './App.css';

import AddMovie from './AddMovie.js'
import MovieAppBar from './MovieAppBar.js'
import MovieLists from './MovieLists.js'
import MovieDetail from './MovieDetail'


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
      <Route path="/view/:id" component={MovieDetail} />
      {/*
      <Route path="/add" component={About}/>
      <Route path="/topics" component={Topics}/>
      */}
    </div>
  </Router>
)


export default App;
