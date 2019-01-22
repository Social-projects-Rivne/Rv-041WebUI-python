import React from "react";
import { CardContent, Grid, withStyles, Card } from "@material-ui/core";
import MenuItem from "./MenuItem";

const styles = {
  card: {
    background: "rgba(230, 232, 209, 0.96)",
    marginTop: 8
  },
  media: {
    height: 305,
    width: "100%"
  },
  root: {
    padding: 8
  }
};

const MenuItemList = props => {
  const { classes, items } = props;
  return (
    <Card>
      <CardContent>
        <Grid container>
          {items &&
            items.map(item => {
              <MenuItem item={item} />;
            })}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(MenuItemList);
