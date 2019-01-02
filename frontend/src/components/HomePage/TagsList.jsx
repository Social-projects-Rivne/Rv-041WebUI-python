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
import { Link } from "react-router-dom";

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
    flex: 1,
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

class TagsList extends Component {
  state = {
    tags: []
  };

  componentDidMount() {
    fetch("http://localhost:3000/tags.json")
      .then(response => response.json())
      .then(tags => this.setState({ tags }));
  }

  render() {
    const { classes } = this.props;
    const { tags } = this.state;

    const tagsLength = tags.length;

    return (
      <div className={classes.root}>
        {tagsLength > 0 && (
          <GridList
            spacing={16}
            className={classes.gridList}
            cols={tagsLength > 5 ? 5.5 : tagsLength + 1}
          >
            <GridListTile to="/restaurants-list" component={Link}>
              <img
                alt="View All"
                src="https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=300&h=300&q=60"
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
                <GridListTile
                  to={`/restaurants-list?tag=${tag.name}`}
                  component={Link}
                  key={tag.name}
                >
                  {
                    <img
                      src="https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=300&h=300&q=20"
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
        )}
      </div>
    );
  }
}

TagsList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TagsList);
