import React from "react";
import {
  withStyles,
  Card,
  Divider,
  Button,
  CardMedia,
  Typography,
  Grid,
  CardContent,
} from "@material-ui/core/";
import AddUpdateRestaurant from "../Profile/AddUpdateRestaurant";

const styles = {
  root: {
    paddingLeft: 24,
    paddingRight: 24,
  },
};
const image =
  "https://www.omnihotels.com/-/media/images/hotels/bospar/restaurants/bospar-omni-parker-house-parkers-restaurant-1170.jpg";

class restaurantInfo extends React.Component {
  state = {
    restInfo: [],
  };

  componentDidMount() {
    const restId = this.props.url.match.params.id;
    fetch(`http://localhost:6543/restaurant/${restId}`)
      .then(response => response.json())
      .then(rest => this.setState({ restInfo: rest.data[0] }));
  }

  render() {
    const { classes } = this.props;
    const { restInfo } = this.state;
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
                marginRight: "16px",
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
        <AddUpdateRestaurant
          requestType="put"
          id={this.props.url.match.params.id}
        />
      </div>
    );
  }
}

export default withStyles(styles)(restaurantInfo);
