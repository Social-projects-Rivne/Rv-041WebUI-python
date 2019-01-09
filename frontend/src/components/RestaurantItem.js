import React from "react";
import {
  withStyles,
  Card,
  CardMedia,
  Button,
  Typography,
  CardContent,
  Divider,
} from "@material-ui/core/";

import { Link } from "react-router-dom";

const styles = theme => ({
  card: {
    display: "flex",
  },
  media: {
    width: theme.spacing.unit * 20,
    flex: 1,
  },
  details: {
    display: "flex",
    flexDirection: "column",
    flex: 4,
  },
  info: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  nav: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: theme.spacing.unit,
  },
});

function restaurantItem(props) {
  const { classes, id, name, description, address, phone } = props;
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image="https://media-cdn.tripadvisor.com/media/photo-f/04/43/20/9c/whisky-corner.jpg"
        title={name}
      />

      <div className={classes.details}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography paragraph component="p">
            {description}
          </Typography>
          <Divider />
          <div className={classes.info}>
            <Typography variant="subtitle2">Address : {address}</Typography>
            <Typography variant="subtitle2">Phone: {phone}</Typography>
          </div>
          <Divider />
          <div className={classes.nav}>
            <Button
              variant="contained"
              component={Link}
              to={"/restaurants/" + id}
              size="small"
              color="primary"
            >
              details
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

export default withStyles(styles)(restaurantItem);
