import React from "react";
import {
  withStyles,
  Card,
  CardMedia,
  Grid,
  TextField,
  Typography
} from "@material-ui/core";

const styles = theme => ({
  card: { height: "145px", marginTop: "4px", backgroundSize: "contain" },
  media: {
    height: "100%",
    marginTop: "8px",

    "&:hover $hiddenGrid": {
      visibility: "visible",
      opacity: "1"
    }
  },
  hiddenGrid: {
    height: "100%",
    paddingLeft: "10px",
    visibility: "hidden"
  }
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
    }
  };
  render() {
    const { classes, item } = this.props;
    const { img, name, price } = item;
    return (
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={img} title={name}>
          <Grid
            container
            alignItems="flex-end"
            justify="center"
            spacing={16}
            className={classes.hiddenGrid}
          >
            <Grid item xs={4}>
              <Typography>{price / 100 + "$"}</Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="quantity"
                value={this.state.quantity}
                onChange={this.handleChange("quantity")}
                type="number"
                className={classes.textField}
                margin="normal"
              />
            </Grid>
            <Grid item xs={4}>
              <Typography>
                {(price / 100) * this.state.quantity + "$"}
              </Typography>
            </Grid>
          </Grid>
        </CardMedia>
      </Card>
    );
  }
}

export default withStyles(styles)(OrderCartItem);
