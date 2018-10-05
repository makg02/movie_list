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

import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';



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

class MovieDetail extends React.Component {

  state = {

    title: '',
    description: '',
    is_active: false,
    fromAdd : false,
    fromEdit : false,
    vertical: 'top',
    horizontal: 'center'

  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {

    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  componentDidMount(){
    //console.log(this.props.location.state.fromAdd)
    if (this.props.location.state.fromAdd){
        this.setState({fromAdd : true})
    }

    if (this.props.location.state.fromEdit){
        this.setState({fromEdit: true})
    }

    //console.log(this.props.match.params.id)
    const movieId = this.props.match.params.id;
    const viewApi = "http://localhost:8000/movie_list/view/" + movieId;
    axios.get(viewApi).then(res =>{
      console.log(res)
      this.setState({
        title : res.data.title,
        description : res.data.description,
        is_active : res.data.is_active
      })
    }).catch(err =>{
      alert(err)
    })

  }



  render() {
    const { classes } = this.props;
    const { vertical, horizontal, fromAdd, fromEdit} = this.state;
    return (
      <div className={classes.root}>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={fromAdd}
          onClose={this.handleClose}
          ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{this.state.title} successfully created!</span>}
        />

        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={fromEdit}
          onClose={this.handleClose}
          ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{this.state.title} successfully edited!</span>}
        />


        <TextField fullWidth
          disabled
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
          disabled
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
            disabled
            id="adornment-amount"
            value={this.state.description}
            onChange={this.handleChange('description')}
            startAdornment={<InputAdornment position="start">Description</InputAdornment>}
          />


        </FormControl>




      </div>
    );
  }
}

MovieDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MovieDetail);
