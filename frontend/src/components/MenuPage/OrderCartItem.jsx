import React from "react";
import {
  withStyles,
  Card,
  CardMedia,
  Grid,
  TextField,
  Typography,
  IconButton,
  Fab
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";

const styles = theme => ({
  card: {
    height: "145px",
    marginTop: "4px",
    position: "relative",
    backgroundSize: "contain",
    "&:hover $media": {
      transform: "scale(1.2)"
    },
    "&:hover $mask": {
      opacity: 0.7
    }
  },
  media: {
    height: "100%",
    transition: theme.transitions.create("transform", { duration: 1000 }),
    cursor: "pointer"
  },
  mask: {
    transition: theme.transitions.create("opacity", { duration: 1000 }),
    display: "flex",
    opacity: 0,
    padding: "16px",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    backgroundColor: "#000",
    color: "#fff",
    fontWeight: "bold"
  },
  textField: {
    "& $input": {
      color: "#fff",
      fontSize: "14px",
      fontWeight: "400"
    }
  },
  button: {}
});

class OrderCartItem extends React.Component {
  state = {
    quantity: this.props.item.quantity
  };

  handleChange = name => event => {
    if (event.target.value >= 1) {
      this.setState({
        [name]: event.target.value
      });
      this.props.handleQuantityChange(
        event,
        event.target.value,
        this.props.item.id
      );
    }
  };
  render() {
    const { classes, item } = this.props;
    const { img, name, price } = item;
    return (
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={img} title={name} />
        <div className={classes.mask}>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <Fab
                onClick={() => this.props.handleRemoveItem(item.id)}
                aria-label="Remove item"
                className={classes.button}
                size="small"
              >
                <Clear />
              </Fab>
            </Grid>
            <Grid item xs={12}>
              {""}
            </Grid>
            <Grid item container justify="center" xs={12} spacing={16}>
              <Grid item xs={4}>
                <Typography color="inherit">{price + "$"}</Typography>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value={this.state.quantity}
                  onChange={this.handleChange("quantity")}
                  type="number"
                  className={classes.textField}
                />
              </Grid>
              <Grid item xs={4}>
                <Typography color="inherit">
                  {(price / 100) * this.state.quantity + "$"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(OrderCartItem);
