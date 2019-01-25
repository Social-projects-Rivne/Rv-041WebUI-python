import React from "react";
import {
  withStyles,
  Card,
  CardMedia,
  Button,
  Typography,
  CardContent,
  Divider,
  Chip,
  GridList,
  Tabs
} from "@material-ui/core/";

import { Link } from "react-router-dom";

const styles = theme => ({
  card: {
    display: "flex"
  },
  media: {
    width: theme.spacing.unit * 20,
    flex: 1
  },
  details: {
    display: "flex",
    flexDirection: "column",
    flex: 4
  },
  info: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  nav: {
    display: "flex",
    paddingTop: theme.spacing.unit,
    alignItems: "center"
  },
  chip: {
    margin: theme.spacing.unit / 2
  }
});

function restaurantItem(props) {
  const { classes, id, name, description, address, phone, tags } = props;
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
            {description.length > 230
              ? description.slice(0, 230) + "..."
              : description}
          </Typography>
          <Divider />
          <div className={classes.info}>
            <Typography variant="subtitle2">Address : {address}</Typography>
            {phone && (
              <Typography variant="subtitle2">Phone: {phone}</Typography>
            )}
          </div>
          <Divider />
          <div className={classes.nav}>
            <div className={classes.tags}>
              {tags.map(tag => (
                <Chip key={tag.id} label={tag.name} className={classes.chip} />
              ))}
            </div>

            <Button
              style={{ marginLeft: "auto" }}
              variant="contained"
              component={Link}
              to={"/profile/my_restaurant/" + id}
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
