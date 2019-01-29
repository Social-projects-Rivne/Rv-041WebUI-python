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
    fetch("http://localhost:6543/api/tag")
      .then(response => response.json())
      .then(tags => {
        const sortedTags = tags.data.sort((a, b) => b.priority - a.priority);
        this.setState({
          tags: sortedTags
        });
      });
  }

  render() {
    const { classes } = this.props;
    const { tags } = this.state;
    const tagsArr = [{ name: "View All", priority: -1 }, ...tags];

    return (
      <div className={classes.root}>
        {tagsArr.length > 0 && (
          <GridList
            spacing={16}
            className={classes.gridList}
            cols={tagsArr.length > 5 ? 5.5 : tagsArr.length}
          >
            {tagsArr.map((tag, index) => (
              <GridListTile
                to={
                  index === 0 ? "/restaurants" : `/restaurants?tag=${tag.name}`
                }
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
