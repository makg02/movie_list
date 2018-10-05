import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';

import {
  Redirect,
} from 'react-router-dom'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
     flexGrow: 1,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    flexBasis: 200,
  },
});

const ranges = [
  {
    value: true,
    label: 'Active',
  },
  {
    value: false,
    label: 'Inactive',
  },

];

class UpdateMovie extends React.Component {

  state = {

    title: '',
    description: '',
    _id : '',
    _rev : '',
    is_active: false,
    redirectToReferrer : false,
    redirectLink : ''

  };

  componentDidMount(){
    console.log(this.props.match.params.id)
    const movieId = this.props.match.params.id;
    const viewApi = "http://localhost:8000/movie_list/view/" + movieId;
    axios.get(viewApi).then(res =>{
      console.log(res)
      this.setState({
        _id : res.data._id,
        _rev : res.data._rev,
        title : res.data.title,
        description : res.data.description,
        is_active : res.data.is_active,
      })
    }).catch(err =>{
      alert(err)
    })

  }


  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {

    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleSubmit = () => {
    console.log(this.state)
    const data = {
      _id : this.state._id,
      _rev : this.state._rev,
      title : this.state.title,
      description : this.state.description,
      is_active  : this.state.is_active
    }
    axios.post('http://localhost:8000/movie_list/update', data)
      .then(res => {
        console.log(res)
        if(res.status ===200){
          this.setState({redirectToReferrer: true})
          const rl = '/view/' + res.data;
          this.setState({redirectLink : rl})
        }
      }).catch(
        err =>{
          alert(err)
        }
      )
    //this.setState(state => ({ showPassword: !state.showPassword }));
  };



  render() {
    const { classes } = this.props;
    const redirectToReferrer = this.state.redirectToReferrer;
    const redirectLink = this.state.redirectLink;


    if(redirectToReferrer && redirectLink){
      const id = this.state.id;
      console.log(this.state.redirectLink)
      return <Redirect to={{ pathname : this.state.redirectLink, state : { fromEdit : true}}} />

    }

    return (

      <div className={classes.root}>
        <TextField fullWidth
          label="Movie Title"
          value={this.state.title}
          onChange={this.handleChange('title')}
          id="simple-start-adornment"
          className={classNames(classes.margin, classes.textField)}
          InputProps={{
            startAdornment: <InputAdornment position="start">Title</InputAdornment>,
          }}
        />
        <TextField
          select
          label="Select Status"
          className={classNames(classes.margin, classes.textField)}
          value={this.state.is_active}
          onChange={this.handleChange('is_active')}

        >
          {ranges.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <FormControl fullWidth className={classes.margin}>
          <InputLabel htmlFor="adornment-amount">Movie Description</InputLabel>
          <Input
            id="adornment-amount"
            value={this.state.description}
            onChange={this.handleChange('description')}
            startAdornment={<InputAdornment position="start">Description</InputAdornment>}
          />


        </FormControl>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.root}>
          <Button onClick={this.handleSubmit} size="small" variant="contained" color="primary" className={classes.button} >
            UPDATE
          </Button>
        </Grid>



      </div>
    );
  }
}

UpdateMovie.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UpdateMovie);
