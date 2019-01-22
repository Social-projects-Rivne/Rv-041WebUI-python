import React from "react";
import { CardContent, Grid, withStyles, Button, Card } from "@material-ui/core";

const styles = theme => ({
  root: {
    maxWidth: 200,
    padding: 0,
    margin: 16
  },
  button: {}
});

const CategoriesList = props => {
  const { classes, cats } = props;
  return (
    <div className={classes.root}>
      <Card>
        {cats && (
          <CardContent>
            <Grid container>
              {cats.map((cat, index) => {
                return (
                  <Grid key={"Cat" + index} item xs={12}>
                    <Button
                      href={"#" + cat}
                      fullWidth
                      className={classes.button}
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
    </div>
  );
};

export default withStyles(styles)(CategoriesList);
