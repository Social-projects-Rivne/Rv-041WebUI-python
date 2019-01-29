import React from "react";
import {
  CardContent,
  Grid,
  withStyles,
  Button,
  Card,
  Divider
} from "@material-ui/core";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";
import classnames from "classnames";
const styles = theme => ({
  root: { position: "sticky", top: "30px" },
  button: {
    "&.active": {
      color: theme.palette.secondary.light
    }
  },
  backIcon: {}
});

const CategoriesList = props => {
  const { classes, cats } = props;
  return (
    <Card className={classes.root}>
      {cats && (
        <CardContent>
          <Grid container>
            {cats.map((cat, index) => {
              const act = ""; // active == index ? "active" : "";
              return (
                <Grid key={"Cat" + index} item xs={12}>
                  <Button
                    href={"#" + cat}
                    fullWidth
                    className={classnames(classes.button, act)}
                  >
                    {cat}
                  </Button>
                </Grid>
              );
            })}

            <Grid key={"Cat" + 101} item xs={12}>
              <Divider variant="fullWidth" />
              <Button href={"#" + cats[0]} fullWidth className={classes.button}>
                <KeyboardArrowUp className={classes.backIcon} />
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      )}
    </Card>
  );
};

export default withStyles(styles)(CategoriesList);
