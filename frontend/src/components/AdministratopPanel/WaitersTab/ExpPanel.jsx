import React from "react";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core/styles";


const styles = theme => ({
    wrapper:{
        width: "100%",
        marginTop: 16,
        padding: 8,
    },
});

class ExpPanel extends React.Component {
  state = {
    expanded: false
  };
  handleExpand = () => {
    this.setState({ expanded: !this.state.expanded });
  };
  render() {
      const { classes } = this.props;
    return (
      <ExpansionPanel
        expanded={this.state.expanded}
        onChange={this.handleExpand}
        className={classes.wrapper}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          {this.props.summary}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>{this.props.details}</ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}
// <ExpPanel summary={<SumaryComp hook={this.hook}/>} details={<Details />} />

export default withStyles(styles)(ExpPanel);