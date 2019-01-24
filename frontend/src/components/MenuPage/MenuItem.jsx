import React from "react";
import {
  withStyles,
  Grid,
  CardContent,
  CardMedia,
  Card,
  Typography,
  CardHeader,
  Collapse,
  IconButton,
  CardActions,
  Divider,
  Modal
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = {
  root: {},
  media: { height: "100%" },
  buttons: { display: "flex", justifyContent: "space-between" },
  modalDiv: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    maxWidth: "500px",
    maxHeight: "454px"
  },
  modalImage: {
    height: "100%",
    backgroundSize: "contain"
  }
};

class MenuItem extends React.Component {
  state = {
    expanded: false,
    isOpen: false,
    image: null
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleOpenImage = e => {
    console.log(e.currentTarget);
    this.setState(state => ({
      isOpen: !state.isOpen,
      image: this.props.item.img
    }));
  };

  render() {
    const { classes, item } = this.props;
    const { img, description, ingredients, name, id } = item;

    return (
      <div className={classes.root}>
        <Card>
          <Grid container alignItems="stretch" spacing={8}>
            <Grid item xs={3}>
              <CardMedia
                className={classes.media}
                image={img}
                title={name}
                onClick={e => this.handleOpenImage(e)}
              />
            </Grid>
            <Grid item xs={9}>
              <CardHeader title={name} />
              <Divider variant="fullWidth" />

              <Grid container>
                <Grid item>
                  <Typography gutterBottom>
                    {description.length > 300
                      ? description.slice(0, 300) + "..."
                      : description}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    {ingredients.length > 100
                      ? ingredients.slice(0, 100) + "..."
                      : ingredients}
                  </Typography>
                </Grid>
              </Grid>
              <CardActions className={classes.buttons}>
                <IconButton
                  onClick={this.handleExpandClick}
                  aria-expanded={this.state.expanded}
                  aria-label="Show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography variant="subtitle2" gutterBottom>
                    Description:
                  </Typography>
                  <Typography>{description}</Typography>
                </CardContent>
                <CardContent>
                  <Typography variant="subtitle2" gutterBottom>
                    Ingredients:
                  </Typography>
                  <Typography>{ingredients}</Typography>
                </CardContent>
              </Collapse>
            </Grid>
          </Grid>
        </Card>
        {this.state.isOpen && (
          <Modal open={true} onClose={this.handleOpenImage}>
            <div className={classes.modalDiv}>
              <CardMedia
                className={classes.modalImage}
                image={this.state.image}
                title={name}
                onClick={e => this.handleOpenImage(e)}
              />
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(MenuItem);
