import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import VideoIcon from '@material-ui/icons/Videocam';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';

import Snackbar from '@material-ui/core/Snackbar';

import axios from 'axios';


import {
  Link
} from 'react-router-dom'




const styles = theme => ({
  button: {
   margin: theme.spacing.unit,
 },
 input: {
   display: 'none',
 },
  root: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});


class MovieLists extends Component {

  constructor(props){
    super(props);
    this.state = {
      open : false,
      movies : [],
      deleteId  : '',
      is_visit : false,
      vertical: 'top',
      horizontal: 'center',
      last_visit_time : ''

    }


  }

  componentDidMount(){

    axios.get('http://localhost:8000/movie_list')
      .then(res => {

        console.log(res)

        const movies = res.data.movies;
        const is_visit = res.data.is_visit;
        const last_visit_time = res.data.last_visit_time;

        if (is_visit){
          this.setState({movies: movies})
          this.setState({is_visit : is_visit})
          this.setState({last_visit_time : last_visit_time})
        } else{
          this.setState({movies: movies})
          this.setState({is_visit : is_visit})
          this.setState({last_visit_time : ''})
        }

      }).catch(err =>{
        alert(err)
      });
  }


  handleClickOpen = () => {
   this.setState({ open: true });
 };

 handleDelete = (bool) => {

   if(bool){
     console.log(bool)
     console.log(this.state.deleteId)
     const delStateId = this.state.deleteId;
     const delApi = 'http://localhost:8000/movie_list/delete/' + delStateId;

     axios.delete(delApi)
      .then(res => {
        console.log(res)
        const m = res.data;
        this.setState({open : false});
        this.setState({deleteId : ''});
        this.setState({movies : m})

      }).catch(err => {
        alert(err)
      });

   } else{

     this.setState({ open: false });
     this.setState({ deleteId : ''});
     console.log(this.state)
   }

 };

 handleDialog = (id) => {
   console.log(id)
   this.setState({open: true})
   this.setState({deleteId : id})
 };

 handleThumbsUp = (id, bool) => {
   console.log(id);
   console.log(bool);

   const data = {
     '_id' : id,
     'like' : bool
   }
   //console.log(likeApi)
   console.log(data)

  axios.post('http://localhost:8000/movie_list/like', data)
    .then(res => {
      const t = res.data;
      this.setState({movies : t})
    }).catch(err => {
      console.log(err)
    })


 };

  render(){

    console.log(this.state)
    const { classes } = this.props;
    const { vertical, horizontal, is_visit, last_visit_time} = this.state;

    return (
      <div className={classes.root}>


          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={true}
            onClose={this.handleClose}
            ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={is_visit ? <span id="message-id"> `Welcome back! You've visited this page last {last_visit_time} `</span> : <span id="message-id">Welcome to our site!</span>}
          />



        <List>
            {this.state.movies.map((movie) =>
              <ListItem key={movie._id}>
                <Avatar>
                  <VideoIcon />
                </Avatar>
               <ListItemText primary={movie.title} secondary={movie.is_active ? 'Active' : 'Not Active'} />
               <ListItemSecondaryAction>

               {movie.like ?
                <IconButton aria-label="ThumbUp">
                  <ThumbUp onClick={(e) => this.handleThumbsUp(movie._id, !movie.like, e)}/>
                </IconButton> :
                <IconButton aria-label="ThumbUp">
                  <ThumbUpAltOutlined onClick={(e) => this.handleThumbsUp(movie._id, !movie.like, e)}/>
                </IconButton>
                }



                  <Link to={{ pathname: `/view/${movie._id}`, state:{ fromAdd : false, fromEdit : false }, style: {color : '#FFF', textDecoration : 'none'}}}>
                      <Button variant="outlined" className={classes.button}>
                        View
                      </Button>
                  </Link>

                  <Link to={`/update/${movie._id}`} style={{ color: '#FFF', textDecoration: 'none' }}>
                      <Button variant="contained" color="primary" className={classes.button}>
                        Edit
                      </Button>
                  </Link>



                     <IconButton aria-label="Delete">
                       <DeleteIcon  onClick={(e) => this.handleDialog(movie._id, e)}/>
                     </IconButton>



               </ListItemSecondaryAction>
              </ListItem>

            )}

        </List>

      <Dialog
         open={this.state.open}
         onClose={this.handleClose}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
       >
       <DialogTitle id="alert-dialog-title">{"Are you sure you would like to delete this?"}</DialogTitle>
         <DialogActions>
           <Button onClick={(e) => this.handleDelete(false, e)} color="primary">
             Disagree
           </Button>
           <Button onClick={(e) => this.handleDelete(true, e)} color="primary" autoFocus>
             Agree
           </Button>
         </DialogActions>
       </Dialog>

    </div>
    )
  }

}


MovieLists.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MovieLists);
