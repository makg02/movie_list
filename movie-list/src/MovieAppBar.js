import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';


import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom'


const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function MovieAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/" style={{ color: '#FFF', textDecoration: 'none' }}>
            <Typography variant="title" color="inherit" className={classes.grow}>
              Movies
            </Typography>
          </Link>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
            >
            <Link to="/add" style={{ color: '#FFF', textDecoration: 'none' }}>
              <Button color="inherit">ADD</Button>
            </Link>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

MovieAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MovieAppBar);
