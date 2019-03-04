import React from "react";
import {
  withStyles,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = theme => ({
  chip: {
    background: theme.palette.secondary.light,
    color: theme.palette.primary.dark
  }
});

class ExpPanel extends React.Component {
  state = {
    expanded: false
  };
  handleExpand = () => {
    this.setState({ expanded: !this.state.expanded });
  };
  render() {
    return (
      <ExpansionPanel
        expanded={this.state.expanded}
        onChange={this.handleExpand}
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
