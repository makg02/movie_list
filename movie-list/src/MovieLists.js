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
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';



import axios from 'axios';


import {
  BrowserRouter as Router,
  Route,
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
    }


  }

  componentDidMount(){
    axios.get('http://localhost:8000/movie_list')
      .then(res => {
        const movies = res.data;
        console.log(res)
        this.setState({movies:movies})

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


    return (
      <div className={classes.root}>
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



                    <Link to={`/view/${movie._id}`} style={{ color: '#FFF', textDecoration: 'none' }}>
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
