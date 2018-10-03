import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme =>  ({
  root : {
    flexGrow : 1,
  },
  demo : {
    height  : 240,
  },
  card: {
    minWidth:275,
  },
  bullet : {
    display : 'inline-block',
    margin : '0 2px',
    transform : 'scale(0.8)',
  },
  title : {
    marginBottom : 16,
    fontSize : 14,
  },
  pos : {
    marginBottom : 12
  }
});

function TitleCard(props){
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (


      <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary">
           Nun
        </Typography>
      </CardContent>
      <Grid container
        direction="row"
        justify="flex-end">



        <CardActions>
         <Button size="small">View</Button>
        </CardActions>
        <CardActions>
          <Button size="small">Add</Button>
        </CardActions>
        <CardActions>
          <Button size="small">Edit</Button>
        </CardActions>
        <CardActions>
          <Button size="small">Delete</Button>
        </CardActions>
      </Grid>
    </Card>



  )
}

TitleCard.propTypes = {
  classes : PropTypes.object.isRequired,
}

export default withStyles(styles)(TitleCard);
