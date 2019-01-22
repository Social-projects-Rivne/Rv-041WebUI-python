import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const styles = {
  card: {
    background: "rgba(230, 232, 209, 0.96)",
    marginTop: 8
  },
  media: {
    height: 305,
    width: "100%"
  },
  root: {
    padding: 8
  }
};

function restaurantItem(props) {
  const { classes, id, name, description, address } = props;

  return (
    <div className={classes.root}>
      <Card>
        <Grid container alignItems={"center"}>
          <Grid item sm={3}>
            <CardMedia
              className={classes.media}
              image="https://media-cdn.tripadvisor.com/media/photo-f/04/43/20/9c/whisky-corner.jpg"
              title={name}
            />
          </Grid>
          <Grid item sm={9} style={{ padding: 16 }}>
            <Grid>
              <Typography gutterBottom variant="h4" component="h2">
                {name}
              </Typography>

              <Typography component="p" variant="h6">
                {description}
              </Typography>
            </Grid>
            <Grid container justify="space-between" alignItems={"baseline"}>
              <Typography component="p" variant="h6" style={{ paddingTop: 16 }}>
                Address : {address}
              </Typography>
              <Typography align={"right"}>
                <Button
                  component={Link}
                  variant="contained"
                  color="primary"
                  to={"/restaurants/" + id}
                  size="large"
                >
                  go to details
                </Button>
                <Button
                  component={Link}
                  variant="contained"
                  color="primary"
                  to={"restaurants/" + id + "/menu/1"}
                  size="large"
                  style={{ marginLeft: 16, marginRight: 24 }}
                >
                  Watch menu
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}

export default withStyles(styles)(restaurantItem);
