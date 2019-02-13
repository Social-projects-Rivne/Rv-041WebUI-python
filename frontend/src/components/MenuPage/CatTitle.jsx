import React from "react";
import ReactDOM from "react-dom";
import { Typography, Grid } from "@material-ui/core";
import MenuItem from "./MenuItem";

class CatTitle extends React.Component {
  componentDidMount() {
    const { add } = this.props;
    add(ReactDOM.findDOMNode(this).getBoundingClientRect().top);
  }

  render() {
    const { cat, items, inCartItems } = this.props;
    return (
      <React.Fragment>
        <Grid item>
          <Typography id={cat} variant="h5">
            {cat}
          </Typography>
        </Grid>
        {items.map(item => {
          const key = cat + item.id;
          return (
            <Grid item key={key}>
              <MenuItem
                item={item}
                addItemHook={this.props.addItemHook}
                locked={inCartItems.includes(item.id)}
              />
            </Grid>
          );
        })}
      </React.Fragment>
    );
  }
}

export default CatTitle;
