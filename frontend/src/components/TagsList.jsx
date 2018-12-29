import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton
} from "@material-ui/core";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const tags = [
  {
    name: "Pizza",
    priority: 1
  },
  {
    name: "Sushi",
    priority: 2
  },
  {
    name: "asdasda",
    priority: 3
  },
  {
    name: "wqdwqd",
    priority: 4
  },
  {
    name: "Pizza12",
    priority: 1
  },
  {
    name: "Sushi122f1",
    priority: 2
  },
  {
    name: "asdasdawfqfw",
    priority: 3
  },
  {
    name: "wqdwqdfwqfqw",
    priority: 4
  },
  {
    name: "Sushiqwfqw",
    priority: 2
  },
  {
    name: "asdasdaqwf",
    priority: 3
  },
  {
    name: "wqdwqdfqw",
    priority: 4
  }
];

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  title: {
    color: theme.palette.primary.light
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  }
});

function SingleLineGridList(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={5}>
        <GridListTile>
          <img
            alt="View All"
            src="https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=200&h=200&q=60"
          />
          <GridListTileBar
            title="View All"
            classes={{
              root: classes.titleBar,
              title: classes.title
            }}
            actionIcon={
              <IconButton>
                <StarBorderIcon className={classes.title} />
              </IconButton>
            }
          />
        </GridListTile>
        {tags
          .sort((a, b) => a.priority - b.priority)
          .map(tag => (
            <GridListTile key={tag.name}>
              {
                <img
                  src="https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=200&h=200&q=60"
                  alt={tag.name}
                />
              }
              <GridListTileBar
                title={tag.name}
                classes={{
                  root: classes.titleBar,
                  title: classes.title
                }}
                actionIcon={
                  <IconButton>
                    <StarBorderIcon className={classes.title} />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
      </GridList>
    </div>
  );
}

SingleLineGridList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SingleLineGridList);
