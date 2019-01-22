import React from "react";
import {
  withStyles,
  Card,
  Divider,
  Typography,
  CardContent
} from "@material-ui/core/";

const styles = {
  root: {
    paddingLeft: 24,
    paddingRight: 24
  }
};

class RestaurantInfo extends React.Component {
  state = {
    data: []
  };

  componentDidMount() {}

  render() {
    const { classes, restInfo, restaurantItem } = this.props;
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
                {restaurantItem.data[0].name}
              </Typography>
              <Typography gutterBottom variant="h6" component="p">
                Address: {restaurantItem.data[0].address_id} <br />
                Phone: {restaurantItem.data[0].phone}
              </Typography>
              <Divider style={{ marginBottom: "2em" }} />
              <Typography variant="body1" gutterBottom component="p">
                {restaurantItem.data[0].description}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(RestaurantInfo);
