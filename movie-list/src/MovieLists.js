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
    }


  }

  componentWillMount(){
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

 handleClose = (e) => {

   if(e){
     console.log(e)
     this.setState({ open: false });
   } else{

     this.setState({ open: false });
   }

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
                       <DeleteIcon  onClick={this.handleClickOpen}/>
                     </IconButton>

                     <Dialog
                       open={this.state.open}
                       onClose={this.handleClose}
                       aria-labelledby="alert-dialog-title"
                       aria-describedby="alert-dialog-description"
                     >

                     <DialogTitle id="alert-dialog-title">{"Are you sure you would like to delete this?"}</DialogTitle>

                     <DialogActions>
                       <Button onClick={() => this.handleClose(false)} color="primary">
                         Disagree
                       </Button>
                       <Button onClick={() => this.handleClose(true)} color="primary" autoFocus>
                         Agree
                       </Button>
                     </DialogActions>
                   </Dialog>
               </ListItemSecondaryAction>
              </ListItem>
            )}

        </List>
    </div>
    )
  }

}


MovieLists.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MovieLists);
