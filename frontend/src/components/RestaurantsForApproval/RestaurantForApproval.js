import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = theme => ({
  card: {},
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  avatar: {
    backgroundColor: red[500]
  }
});

function RestaurantForApproval(props) {

  const {
    name,
    status,
    address_id,
    owner_id,
    id,
    owner_name,
    phone,
    creation_date
  } = props.restaurant;
  const { classes, handleRestaurantApprovement } = props;
  const date = new Date(creation_date * 1000);
  //make button array, depending on Restaurant status
  let buttonArray = [];
  let statusColor = "inherit";
  let statusMessage = "";

  switch (status) {
    case 0:
      buttonArray.push(<Button
        key={0}
        size="small"
        color="secondary"
        onClick={() => handleRestaurantApprovement(id, "DELETE", 2, status)}
      >
        Disapprove
      </Button>);
      buttonArray.push(<Button
        key={1}
        size="small"
        color="primary"
        onClick={() => handleRestaurantApprovement(id, "POST", 1, status)}
      >
        Approve
      </Button>);
      statusColor = "secondary";
      statusMessage = "Unapproved";
      break;
    case 1:
      buttonArray.push(<Button
        key={0}
        size="small"
        color="secondary"
        onClick={() => handleRestaurantApprovement(id, "DELETE", 2, status)}
      >
        Delete
      </Button>);
      statusColor = "primary";
      statusMessage = "Approved";
      break;
    case 2:
      buttonArray.push(<Button
        key={0}
        size="small"
        color="primary"
        onClick={() => handleRestaurantApprovement(id, "POST", 1, status)}
      >
        Restore
      </Button>);
      statusColor = "error";
      statusMessage = "Archived";
      break;
    default:
      ;
  }

  return (
    <div>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label={name} className={classes.avatar}>
              {name[0]}
            </Avatar>
          }
          title={name}
          subheader={"Added: " + String(date.toISOString().slice(0, 10))}
        />

        <CardContent>
          <CardMedia
            className={classes.media}
            image="https://media-cdn.tripadvisor.com/media/photo-f/04/43/20/9c/whisky-corner.jpg"
            title={name}
          />

          <Typography component="p" color={statusColor}>
            {statusMessage}
          </Typography>

          <Typography component="p">
            Owner: {owner_name}
            <br />
            Address: {address_id}
            <br />
            Telephone: {phone}
          </Typography>
        </CardContent>

        <CardActions className={classes.actions}>
          {buttonArray.map(button => button)}
        </CardActions>
      </Card>
    </div>
  );
}

export default withStyles(styles)(RestaurantForApproval);
