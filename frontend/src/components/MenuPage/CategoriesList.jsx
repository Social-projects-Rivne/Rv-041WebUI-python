import React from "react";
import { CardContent, Grid, withStyles, Button, Card } from "@material-ui/core";
import classnames from "classnames";
const styles = theme => ({
  root: { position: "sticky", top: "30px" },
  button: {
    "&.active": {
      color: theme.palette.secondary.light
    }
  }
});

const CategoriesList = props => {
  const { classes, cats, active } = props;
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
          </Grid>
        </CardContent>
      )}
    </Card>
  );
};

export default withStyles(styles)(CategoriesList);
