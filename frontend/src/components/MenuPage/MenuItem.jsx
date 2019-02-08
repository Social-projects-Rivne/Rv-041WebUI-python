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
import { ExpandMore, Forward, Done } from "@material-ui/icons";
import classNames from "classnames";

const styles = {
  root: { transition: "width 2s" },
  media: { height: "100%" },
  buttons: {},
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
  },
  expandButton: {
    transform: "rotate(0deg)",
    transition: "transform 0.2s ease-in-out",
    "&.active": {
      transform: "rotate(-180deg)"
    }
  },
  addButton: {}
};

class MenuItem extends React.Component {
  state = {
    expanded: false,
    isOpen: false,
    image: null,
    quantity: 1,
    transferToCart: {
      isOcured: false,
      itemId: null
    }
  };

  handleTranferClick = () => {
    console.log(this.props);
    this.setState(state => ({
      transferToCart: {
        ...state.transferToCart,
        isOcured: !state.transferToCart.isOcured
      }
    }));
    this.props.addItemHook(this.props.item);
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
    const { img, description, ingredients, name, amount, price } = item;

    return (
      <div className={classes.root}>
        <Card>
          <Grid container alignItems="stretch" spacing={16}>
            <Grid item xs={3}>
              <CardMedia
                className={classes.media}
                image={img}
                title={name}
                onClick={e => this.handleOpenImage(e)}
              />
            </Grid>
            <Grid item xs={9}>
              <Grid container spacing={16}>
                <Grid item xs={8}>
                  <CardHeader title={name} />
                </Grid>
                <Grid item xs={1}>
                  <Typography>{amount}</Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography>{price + "$"}</Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography>{this.state.quantity}</Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography>{this.state.quantity * price}</Typography>
                </Grid>
              </Grid>
              <Divider variant="fullWidth" />

              <CardActions className={classes.buttons}>
                <Grid container style={{ padding: "16px" }}>
                  <Grid item xs={10}>
                    <Typography>
                      {ingredients.length >= 100
                        ? ingredients.slice(0, 100) + "..."
                        : ingredients}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton
                      onClick={this.handleExpandClick}
                      aria-expanded={this.state.expanded}
                      aria-label="Show more"
                      className={classNames(classes.expandButton, {
                        active: this.state.expanded
                      })}
                    >
                      <ExpandMore />
                    </IconButton>
                  </Grid>
                  <Grid item xs={1}>
                    {!this.state.transferToCart.isOcured ? (
                      <IconButton
                        onClick={this.handleTranferClick}
                        aria-expanded={this.state.transferToCart.isOcured}
                        aria-label="Add to cart"
                        className={classNames(classes.addButton, {
                          active: this.state.transferToCart.isOcured
                        })}
                      >
                        <Forward />
                      </IconButton>
                    ) : (
                      <IconButton disableFocusRipple disableRipple disabled>
                        <Done />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
              </CardActions>
            </Grid>

            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
              <Grid
                item
                container
                xs={12}
                spacing={16}
                style={{ padding: "16px" }}
              >
                <Grid item xs={3} />
                <Grid item xs={9}>
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
                </Grid>
              </Grid>
            </Collapse>
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
