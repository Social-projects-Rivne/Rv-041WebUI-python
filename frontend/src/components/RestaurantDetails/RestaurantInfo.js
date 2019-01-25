import React from "react";
import {
  withStyles,
  Card,
  Divider,
  Typography,
  CardContent
} from "@material-ui/core/";

const styles = {
  root: {}
};

class RestaurantInfo extends React.Component {
  render() {
    const { classes, restInfo, onUpdate } = this.props;
    return (
      <div className={classes.root}>
        <Card>
          <CardContent>
            <div
              style={{
                width: "300px",
                height: "300px",
                backgroundColor: "#fafafa",
                float: "left",
                marginRight: "16px"
              }}
              className="gallery"
            />
            <div className="content">
              <Typography gutterBottom variant="h4">
                {restInfo.name}
              </Typography>
              <Typography gutterBottom variant="h6" component="p">
                Address: {restInfo.address_id} <br />
                Phone: {restInfo.phone}
              </Typography>
              <Divider style={{ marginBottom: "2em" }} />
              <Typography variant="body1" gutterBottom component="p">
                {restInfo.description}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(RestaurantInfo);
