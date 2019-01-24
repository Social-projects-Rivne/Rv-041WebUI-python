import React from "react";
import { withStyles, Grid, Typography, Button } from "@material-ui/core";
import MenuItem from "./MenuItem";

const styles = theme => ({
  root: {},
  button: {}
});

const MenuItemList = props => {
  const { classes, items, cats } = props;
  return (
    <Grid container direction="column" spacing={16} wrap="nowrap">
      {items &&
        cats &&
        cats.map(cat => {
          const inCatItems = items[cat];
          return (
            <>
              <Grid item>
                <Typography id={cat} variant="h5">
                  {cat}
                </Typography>
              </Grid>
              {inCatItems.map(item => {
                const key = cat + item.id;
                return (
                  <Grid item>
                    <MenuItem key={key} item={item} />
                  </Grid>
                );
              })}
            </>
          );
        })}
    </Grid>
  );
};

export default withStyles(styles)(MenuItemList);
