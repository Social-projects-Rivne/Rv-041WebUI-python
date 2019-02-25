import React from "react";
import { Link } from "react-router-dom";
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

    const {
      selectedValue,
      tags,
      handleTabChange,
      tagsAdditionalInformation,
      useRouter,
      fixedPath,
    } = props;

    //TODO: !!!transfer all logic to React router, but now - keep two variants (with router and without it):
    if(useRouter){
      return(
        <AppBar position="static">
          <Tabs value={selectedValue} variant="scrollable" scrollButtons="on" onChange={handleTabChange}>
            {tags.map(tag => {
              const additionalInformation = tagsAdditionalInformation[tag];
              return(
                <Tab
                  key={tag}
                  component={Link}
                  to={((fixedPath.trim()).substr(-1) === "/" ? fixedPath : fixedPath + "/") + tag }
                  label={(tag === "" ? "All" : tag) + 
                    (additionalInformation ? " (" + additionalInformation + ")" : " (0)") }
                />
              );
            })}
          </Tabs>
        </AppBar>
      );
    }else{
      return(
        <AppBar position="static">
          <Tabs value={selectedValue} variant="scrollable" scrollButtons="on" onChange={handleTabChange}>
            {tags.map(tag => {
              const additionalInformation = tagsAdditionalInformation[tag];
              return(
                <Tab
                  key={tag}
                  label={tag + (additionalInformation ? " (" + additionalInformation + ")" : " (0)") } 
                />
              );
            })}
          </Tabs>
        </AppBar>
      );
    }
}

export default withStyles(styles)(GenericTabs);