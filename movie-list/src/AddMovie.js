import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import MenuItem from '@material-ui/core/MenuItem';
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

class AddMovie extends React.Component {

  state = {

    title: '',
    description: '',
    is_active: false,
    redirectToReferrer : false,
    redirectLink : ''

  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {

    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleSubmit = () => {
    console.log(this.state)
    const data = {
      title : this.state.title,
      description : this.state.description,
      is_active  : this.state.is_active
    }
    axios.post('http://localhost:8000/movie_list/add', data)
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
      return <Redirect to={{ pathname : this.state.redirectLink, state : { fromAdd : true}}} />

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
            ADD
          </Button>
        </Grid>



      </div>
    );
  }
}

AddMovie.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddMovie);
