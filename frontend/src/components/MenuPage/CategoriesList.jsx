import React from "react";
import { CardContent, Grid, withStyles, Button, Card } from "@material-ui/core";
import classnames from "classnames";
const styles = theme => ({
  root: { position: "sticky", top: "30px" },
  button: {
    "&.active": {
      color: theme.palette.secondary
    }
  }
});

const CategoriesList = props => {
  const { classes, cats, activeCat } = props;
  return (
    <Card className={classes.root}>
      {cats && (
        <CardContent>
          <Grid container>
            {cats.map((cat, index) => {
              return (
                <Grid key={"Cat" + index} item xs={12}>
                  <Button
                    href={"#" + cat}
                    fullWidth
                    className={classnames(
                      classes.button,
                      activeCat === index ? "active" : ""
                    )}
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
