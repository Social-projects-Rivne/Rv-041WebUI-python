import React from "react";
import PropTypes from "prop-types";

import { CardMedia, withStyles, Paper, Divider } from "@material-ui/core";

import MenuToolbar from "./MenuToolbar";

import { MenuContext } from "../../../containers/RestaurantManegmentPage/RestaurantManagmentPage";


const styles = theme => ({
  media: {
    maxWidth: "100%",
    height: "auto",
    minHeight: "200px"
  }
});

class MenuImage extends React.Component {
  render() {
    const { menuItems, classes, menuName } = this.props;
    const menuId = this.props.match.params.id;
    return (
      <Paper>
       <MenuContext.Consumer>
          {ctx => (
            <MenuToolbar menuId={menuId} ctx={ctx} menuName={menuName} />
          )}
        </MenuContext.Consumer>
        <Divider />
        {menuItems && (
          <CardMedia
            className={classes.media}
            component="img"
            src={menuItems}
            title={menuName}
          />
        )}
      </Paper>
    );
  }
}

MenuImage.propTypes = {
  classes: PropTypes.object.isRequired,
  menuName: PropTypes.string.isRequired
};

export default withStyles(styles)(MenuImage);
