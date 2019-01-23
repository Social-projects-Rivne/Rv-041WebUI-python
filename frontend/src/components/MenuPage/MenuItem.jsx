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
  Button
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = {
  root: {},
  media: { height: "100%" },
  buttons: { display: "flex", justifyContent: "space-between" }
};

class MenuItem extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    console.log(this.props);
    const { classes, item } = this.props;
    const { img, description, ingredients, name, id } = item;

    return (
      <Card className={classes.root}>
        <Grid container direction="row">
          <Grid item xs={4}>
            <CardMedia className={classes.media} image={img} title={name} />
          </Grid>
          <Grid item xs={8} direction="column">
            <CardHeader title={name} />
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>
                Description:
              </Typography>
              <Typography>
                {description.length > 300
                  ? description.slice(0, 300) + "..."
                  : description}
              </Typography>
            </CardContent>

            <CardContent>
              <Typography variant="subtitle2" gutterBottom>
                Ingredients:
              </Typography>
              <Typography>
                {ingredients.length > 300
                  ? ingredients.slice(0, 300) + "..."
                  : ingredients}
              </Typography>
            </CardContent>
            <CardActions className={classes.buttons}>
              <IconButton
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Add to Order
              </Button>
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
    );
  }
}

export default withStyles(styles)(MenuItem);
