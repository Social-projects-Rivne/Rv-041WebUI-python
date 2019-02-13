import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";


const styles = {
  root: {
    flexGrow: 1
  },
  item: {
    marginTop: 16
  }
};


function GenericTabs(props) {

    const {selectedValue, tags, handleTabChange} = props;

    return(

      <AppBar position="static">
        <Tabs value={selectedValue} onChange={handleTabChange}>
          {tags.map(tag => {
            return(
              <Tab key={tag} label={tag} />
            );
          })}
        </Tabs>
      </AppBar>

    );
}

export default withStyles(styles)(GenericTabs);