import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  SvgIcon,
  Typography,
  Grid
} from "@material-ui/core";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    overflow: "hidden",
    justifyContent: "space-between"
    // backgroundColor: theme.palette.background.paper
  },
  gridList: {
    flexWrap: "wrap",
    flex: 1,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  title: {
    color: theme.palette.primary.dark,
    textTransform: "capitalize"
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  },
  iconLink: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    border: `2px solid ${theme.palette.grey[200]}`,
    position: "relative",
    minHeight: "160px",
    textDecoration: "none",
    "&:hover $icon": {
      transform: "scale(1.2)"
    }
  },
  icon: {
    transition: ".3s",
    position: "absolute",
    margin: "auto",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
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
    const tagsArr = [
      { name: "View All", priority: -1, icon: "view_all" },
      ...tags
    ];

    return (
      <div className={classes.root}>
        <Grid container>
          {tagsArr.map((tag, index) => (
            <Grid item xs={3}>
              <Link
                key={tag.name}
                className={classes.iconLink}
                to={
                  index === 0 ? "/restaurants" : `/restaurants?tag=${tag.name}`
                }
              >
                <img
                  className={classes.icon}
                  width={78}
                  height={78}
                  src={`../tag_icons/${tag.icon}.svg`}
                  alt={tag.name}
                />
                <Typography className={classes.title} variant="h6">
                  {tag.name}
                </Typography>
              </Link>
            </Grid>
          ))}
        </Grid>
        {/* {tagsArr.length > 0 && (
          <GridList
            spacing={16}
            className={classes.gridList}
            cols={tagsArr.length > 5 ? 5.5 : tagsArr.length}
          >
            {tagsArr.map((tag, index) => (
              <GridListTile
                className={classes.gridItem}
                to={
                  index === 0 ? "/restaurants" : `/restaurants?tag=${tag.name}`
                }
                component={Link}
                key={tag.name}
              >
                {
                  <img
                    width={96}
                    height={96}
                    src={`../tag_icons/${tag.icon}.svg`}
                    alt={tag.name}
                  />
                }
                <GridListTileBar
                  title={tag.name}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title
                  }}
                  // actionIcon={
                  //   <IconButton>
                  //     <StarBorderIcon className={classes.title} />
                  //   </IconButton>
                  // }
                />
              </GridListTile>
            ))}
          </GridList> 
        )}*/}
      </div>
    );
  }
}

TagsList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TagsList);
