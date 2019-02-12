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
import { Editor, convertFromRaw, EditorState, RichUtils } from "draft-js";

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
function handleRestaurantDelete() {
  const headers = new Headers({
    "Content-Type": "application/json",
    "X-Auth-Token": localStorage.getItem("token")
  });

  const fetchInit = {
    method: "PUT",
    headers: headers,
    body: JSON.stringify({
      id: this.props.restInfo.id,
      status: this.props.restInfo.status
    })
  };

  fetch("http://localhost:6543/api/delete_restaurant", fetchInit).then(
    response =>
      !(response.status >= 200 && response.status < 300)
        ? Promise.reject(response.status)
        : response.json()
  );
}

class RestaurantInfo extends React.Component {
  render() {
    const { classes, restInfo, auth, ableUpdate } = this.props;
    const editorState = EditorState.createEmpty();

    var contentStates =
      editorState || convertFromRaw(JSON.parse(restInfo.description_markup));

    EditorState.set(editorState, { currentContent: contentStates });

    return (
      <Card>
        <CardContent>
          <Grid container spacing={16}>
            <Grid item xs={3}>
              <CardMedia
                className={classes.media}
                image="https://media-cdn.tripadvisor.com/media/photo-f/04/43/20/9c/whisky-corner.jpg"
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
              <Editor editorState={contentStates} />
              {auth && ableUpdate && restInfo.status !== deleteStatus && (
                <Grid container justify="flex-end">
                  <Button
                    variant="contained"
                    className={this.props.classes.btn}
                    component={Link}
                    to={"/profile/my_restaurants/"}
                    onClick={handleRestaurantDelete.bind(this)}
                  >
                    delete
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(RestaurantInfo);
