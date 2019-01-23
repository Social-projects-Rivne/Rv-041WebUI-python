import React from "react";
import { CardContent, Grid, withStyles, Button, Card } from "@material-ui/core";

const styles = theme => ({
  root: {},
  button: {}
});

const CategoriesList = props => {
  const { classes, cats } = props;
  return (
    <Card className={classes.root}>
      {cats && (
        <CardContent>
          <Grid container>
            {cats.map((cat, index) => {
              return (
                <Grid key={"Cat" + index} item xs={12}>
                  <Button href={"#" + cat} fullWidth className={classes.button}>
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
