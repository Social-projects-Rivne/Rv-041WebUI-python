import React from "react";
import { withStyles, Grid, Typography, Button } from "@material-ui/core";
import MenuItem from "./MenuItem";
import CatTitle from "./CatTitle";

const styles = theme => ({
  root: {},
  button: {}
});

class MenuItemList extends React.Component {
  constructor(props) {
    super(props);
    this.heightsList = [50];
    window.onscroll = () => {
      // console.log(this.heightsList.length, document.documentElement.scrollTop);
      if (this.heightsList.length === 1) {
        return;
      }
      const curScroll = document.documentElement.scrollTop;
      for (let i = 0; i < this.heightsList.length; i++) {
        const top = this.heightsList[i + 1];
        const bot = this.heightsList[i];
        if (curScroll >= bot && curScroll <= top) {
          this.props.scroll(i);
          return;
        }
      }
    };
  }

  addHeight = height => {
    this.heightsList.push(height);
  };

  render() {
    const { classes, items, cats, scroll } = this.props;
    return (
      <Grid container direction="column" spacing={16} wrap="nowrap">
        {items &&
          cats &&
          cats.map(cat => {
            const inCatItems = items[cat];
            return (
              <CatTitle
                cat={cat}
                items={inCatItems}
                scroll={scroll}
                key={cat + "Key"}
                add={this.addHeight}
              />
            );
          })}
      </Grid>
    );
  }
}

export default withStyles(styles)(MenuItemList);
