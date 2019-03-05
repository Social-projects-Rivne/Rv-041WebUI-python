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
  Modal,
  TextField
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
    transition: "transform 0.2s ease-in-out"
  },
  borderRight: {
    borderRight: "1px solid",
    borderColor: "rgba(0, 0, 0, 0.12)"
  },
  borderLeft: {
    borderLeft: "1px solid",
    borderColor: "rgba(0, 0, 0, 0.12)"
  },
  addButton: {}
};

function formatPrice(value) {
  return Number(value / 100)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

class MenuItem extends React.Component {
  state = {
    expanded: false,
    isOpen: false,
    image: null,
    quantity: 1
  };

  handleTranferClick = () => {
    const item = {
      ...this.props.item,
      quantity: this.state.quantity
    };
    this.props.addItemHook(item);
  };
  handleChange = name => event => {
    if (event.target.value >= 1) {
      this.setState({
        [name]: event.target.value
      });
    }
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleOpenImage = e => {
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
              <Grid container alignItems="center" spacing={16}>
                <Grid item xs={5}>
                  <CardHeader title={name} />
                </Grid>
                <Grid item xs={1} className={classes.borderLeft}>
                  <Typography>{amount + "g"}</Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  className={classNames(
                    classes.borderLeft,
                    classes.borderRight
                  )}
                >
                  <Typography>{formatPrice(price) + "$"}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    disabled={this.props.locked}
                    id="quantity"
                    value={this.state.quantity}
                    onChange={this.handleChange("quantity")}
                    type="number"
                    className={classes.textField}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={2} className={classes.borderLeft}>
                  <Typography>
                    {formatPrice(price * this.state.quantity) + "$"}
                  </Typography>
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
                    <IconButton
                      disabled={this.props.locked}
                      onClick={this.handleTranferClick}
                      aria-label="Add to cart"
                      className={classes.addButton}
                    >
                      {this.props.locked ? <Done /> : <Forward />}
                    </IconButton>
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
