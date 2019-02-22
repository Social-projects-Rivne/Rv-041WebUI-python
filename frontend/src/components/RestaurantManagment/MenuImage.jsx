import React from "react";
import PropTypes from "prop-types";

import { CardMedia, withStyles, Paper, Divider } from "@material-ui/core";

import MenuToolbar from "./MenuToolbar";

const styles = theme => ({
  media: {
    maxWidth: "100%",
    height: "auto"
  }
});

class MenuImage extends React.Component {
  render() {
    const { menu, classes, menuName } = this.props;
    return (
      <Paper>
        <MenuToolbar menuName={menuName} />
        <Divider />
        <CardMedia
          className={classes.media}
          component="img"
          src={menu}
          title={menuName}
        />
      </Paper>
    );
  }
}

MenuImage.propTypes = {
  classes: PropTypes.object.isRequired,
  menu: PropTypes.string.isRequired,
  menuName: PropTypes.string.isRequired
};

export default withStyles(styles)(MenuImage);
