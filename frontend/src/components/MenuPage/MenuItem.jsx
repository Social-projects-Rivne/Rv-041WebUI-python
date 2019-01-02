import React, { Component } from "react";
import {
  withStyles,
  Card,
  CardMedia,
  Typography,
  Collapse,
  IconButton,
  CardContent,
  Divider
} from "@material-ui/core";
import classnames from "classnames";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = theme => ({
  menuItem: {
    display: "flex",
    borderRadius: 0,
    flexDirection: "column"
  },
  itemDetails: {
    display: "flex",
    alignItems: "center"
  },
  itemImg: {
    width: 100,
    height: 100
  },
  itemContent: {
    display: "flex",
    flex: 1,
    alignItems: "center"
  },
  itemCol: {
    flex: 1
  },
  expandedContent: {
    padding: "16px !important"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
});

class MenuItem extends Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.menuItem}>
        <div className={classes.itemDetails}>
          <CardMedia
            className={classes.itemImg}
            image="https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=100&h=100&q=20"
            title="Live from space album cover"
          />
          <CardContent className={classes.itemContent}>
            <div className={classes.itemCol}>
              <Typography align="center" component="h6" variant="h6">
                Long Name
              </Typography>
              <Typography
                align="center"
                variant="subtitle2"
                color="textSecondary"
              >
                (item 1, item 2, item 3, item 4)
              </Typography>
            </div>
            <div className={classes.itemCol}>
              <Typography
                align="center"
                variant="subtitle2"
                color="textSecondary"
              >
                200g
              </Typography>
            </div>
            <div className={classes.itemCol}>
              <Typography
                align="center"
                variant="subtitle2"
                color="textSecondary"
              >
                200g
              </Typography>
            </div>
            <div className={classes.itemCol}>
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.expanded
                })}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </div>
          </CardContent>
        </div>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <Divider />
          <CardContent className={classes.expandedContent}>
            <Typography variant="body1">
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
              over medium-high heat. Add chicken, shrimp and chorizo, and cook,
              stirring occasionally until lightly browned, 6 to 8 minutes.
              Transfer shrimp to a large plate and set aside, leaving chicken
              and chorizo in the pan. Add pimentón, bay leaves, garlic,
              tomatoes, onion, salt and pepper, and cook, stirring often until
              thickened and fragrant, about 10 minutes. Add saffron broth and
              remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

export default withStyles(styles)(MenuItem);
