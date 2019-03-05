import React from "react";
import {
  withStyles,
  Card,
  Divider,
  Typography,
  CardContent,
  Button,
  Grid,
  CardMedia
} from "@material-ui/core/";
import { Link } from "react-router-dom";
import { amber, green, red } from "@material-ui/core/colors/index";

const styles = theme => ({
  root: {},
  active: {
    background: green[500]
  },
  notApproved: {
    background: amber[700]
  },
  btn: {
    background: red[700],
    color: "white"
  },
  media: {
    flex: 1,
    minWidth: theme.spacing.unit * 30,
    minHeight: theme.spacing.unit * 30
  }
});
const deleteStatus = 2;

class RestaurantInfo extends React.Component {
  render() {
    const { classes, restInfo, auth, ableUpdate } = this.props;

    return (
      <Card>
        <CardContent>
          <Grid container spacing={16}>
            <Grid item xs={3}>
              <CardMedia
                className={classes.media}
                image={restInfo.image}
                title={restInfo.name}
              />
            </Grid>
            <Grid item xs={9}>
              <Typography gutterBottom variant="h4">
                {restInfo.name}
              </Typography>
              <Typography gutterBottom variant="h6" component="p">
                Address: {restInfo.address_id} <br />
                Phone: {restInfo.phone}
              </Typography>
              <Typography gutterBottom component="p">
                {restInfo.description}
              </Typography>
              <div dangerouslySetInnerHTML={{ __html: this.props.markup }} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(RestaurantInfo);
