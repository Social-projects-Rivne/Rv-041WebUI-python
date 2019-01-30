import React from "react";
import {
  withStyles,
  Card,
  Divider,
  Typography,
  CardContent,
  Button,
  Grid
} from "@material-ui/core/";
import {Link} from "react-router-dom";
import {amber, green, red} from "@material-ui/core/colors/index";

const styles = {
  root: {},
  active: {
        background: green[500]
    },
  notApproved: {
        background: amber[700]
    },
  btn:{
      background: red[700],
      color: "white"
  }
};
const deleteStatus = 2;
function handleRestaurantDelete()  {

    const headers = new Headers({
        'Content-Type': 'application/json',
        'X-Auth-Token': localStorage.getItem("token")
    });

    const fetchInit = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify({id: this.props.restInfo.id, status: this.props.restInfo.status}),
    };

    fetch('http://localhost:6543/api/delete_restaurant', fetchInit)
        .then(response => (!(response.status >= 200 && response.status < 300)
            ? Promise.reject(response.status)
            : response.json()));

}

class RestaurantInfo extends React.Component {
  render() {
    const {restInfo, auth, ableUpdate } = this.props;
    return (
      <Card>
        <CardContent>
          <div
            style={{
              width: "300px",
              height: "300px",
              backgroundColor: "#dadada",
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
              {auth && ableUpdate && (restInfo.status!==deleteStatus) &&(<Grid container justify="flex-end">
                  <Button
                      variant="contained"
                      className={this.props.classes.btn}
                      component={Link}
                      to={"/profile/my_restaurants/"}
                      onClick={handleRestaurantDelete.bind(this)}
                  >
                      delete
                  </Button>
              </Grid>)}
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(RestaurantInfo);
