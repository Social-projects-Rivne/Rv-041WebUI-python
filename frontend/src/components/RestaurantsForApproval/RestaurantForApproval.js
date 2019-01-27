import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import {Link} from 'react-router-dom';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

function RestaurantForApproval(props){

    const {name, address_id, owner_id, id} = props.restaurant;
    const {classes, handleRestaurantApprovement} = props;

    return(
        <div>
        <Card className={classes.card}>

            <CardHeader
                avatar={
                <Avatar aria-label={name} className={classes.avatar}>
                    {name[0]}
                </Avatar>
                }
                action={
                   <IconButton>
                      <MoreVertIcon />
                   </IconButton>
                }
                title={name}
                subheader="January 25, 2019"
            />

            <CardContent>

              <CardMedia
                className={classes.media}
                image="https://media-cdn.tripadvisor.com/media/photo-f/04/43/20/9c/whisky-corner.jpg"
                title="Paella dish"
              />

              <Typography component="p">
                Address: {address_id}
                <br/>
                Telephone: +380666666666
              </Typography>

            </CardContent>

            <CardActions>
              <Button size="small" color="primary" onClick={() => handleRestaurantApprovement(id, "POST")}>
                Approve
              </Button>
              <Button size="small" color="secondary" onClick={() => handleRestaurantApprovement(id, "DELETE")}>
                Disapprove
              </Button>
            </CardActions>


        </Card>
        </div>
    );

}

export default withStyles(styles)(RestaurantForApproval);