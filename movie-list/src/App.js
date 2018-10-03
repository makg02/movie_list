import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import MovieAppBar from './MovieAppBar.js'
import TitleCard from './TitleCard.js'
import MovieLists from './MovieLists.js'
import axios from 'axios';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'




class MovieList extends Component {

  constructor(){
    super();
    this.state = {
      movies : [],
    };

  }

  componentWillMount(){
    axios.get('http://localhost:8000/movie_list')
      .then(res => {
        const movies = res.data;
        this.setState({movies:movies})
        //console.log(data);
      })
  }


  render(){
    //console.log(this.state)
    let movies = this.state.movies;
    return(
      <div>
        <MovieLists movies={movies}/>
      </div>
    )
  }

}

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.path}/:topicId`} component={Topic}/>
    <Route exact path={match.path} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const App = () => (
  <Router>
    <div>
      <MovieAppBar />



      <Route exact path="/" component={MovieList}/>
      <Route path="/add" component={About}/>
      <Route path="/topics" component={Topics}/>
    </div>
  </Router>
)

/**
class App extends Component {
  render() {
    return (

      <div>
      <MovieAppBar />
      <TitleCard />
      </div>
    );
  }
}
**/
export default App;
