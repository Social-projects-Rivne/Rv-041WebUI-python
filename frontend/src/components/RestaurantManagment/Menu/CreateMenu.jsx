import React from "react";
import PropTypes from "prop-types";

import {
  withStyles,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography,
  Grid,
  FormControlLabel,
  RadioGroup,
  Radio
} from "@material-ui/core/";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const styles = theme => ({
  root: {
    width: "100%"
  },
  resetContainer: {
    padding: theme.spacing.unit * 3
  }
});

const AddInfo = props => {
  return (
    <>
      <Grid item xs={12}>
        <Typography>
          For each ad campaign that you create, you can control how much you're
          willing to spend on clicks and conversions, which networks and
          geographical locations you want your ads to show on, and more.
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <TextValidator
          required
          name="name"
          label="Menu Name"
          fullWidth
          validators={["required"]}
          errorMessages={["Name is required"]}
        />
      </Grid>

      <Grid item xs={4}>
        <RadioGroup row defaultValue={props.menuType}>
          <FormControlLabel
            value="list"
            control={<Radio />}
            label="List menu"
          />
          <FormControlLabel
            value="image"
            control={<Radio />}
            label="Image menu"
          />
        </RadioGroup>
      </Grid>
    </>
  );
};

const FillMenu = () => {
  return (
    <>
      <Grid item xs={12}>
        <Typography>
          An ad group contains one or more ads which target a shared set of
          keywords.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextValidator
          required
          name="name"
          label="Menu Name"
          fullWidth
          validators={["required"]}
          errorMessages={["Name is required"]}
        />
      </Grid>
    </>
  );
};

function getSteps() {
  return ["Add basic information", "Create an ad group", "Create an ad"];
}

function getStepContent(step, menuType) {
  switch (step) {
    case 0:
      return <AddInfo menuType={menuType} />;
    case 1:
      return <FillMenu />;
    case 2:
      return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
    default:
      return "Unknown step";
  }
}

class CreateMenu extends React.Component {
  state = {
    activeStep: 0,
    menuType: "list"
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep, menuType } = this.state;

    return (
      <Paper className={classes.root}>
        <ValidatorForm noValidate autoComplete="off">
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Grid container spacing={16} justify="space-between">
                    {getStepContent(index, menuType)}
                    <Grid item xs={3}>
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        fullWidth
                      >
                        Back
                      </Button>
                    </Grid>
                    <Grid item xs={3}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        fullWidth
                      >
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                      </Button>
                    </Grid>
                  </Grid>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} className={classes.resetContainer}>
              <Typography>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={this.handleReset} className={classes.button}>
                Reset
              </Button>
            </Paper>
          )}
        </ValidatorForm>
      </Paper>
    );
  }
}

CreateMenu.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(CreateMenu);
