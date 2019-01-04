import React from "react";
import { withStyles, Fab } from "@material-ui/core/";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons/";
import SwipeableViews from "react-swipeable-views";

const slides = [
  {
    label: "Some text 1",
    imgPath:
      "https://images.unsplash.com/photo-1462121457351-9fb0f5622b72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&h=500&q=80"
  },
  {
    label: "Some text 2",
    imgPath:
      "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=1400&h=500&q=60"
  },
  {
    label: "Some text 3",
    imgPath:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1400&h=500&q=80"
  }
];

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 2
  },
  sliderContainer: {
    width: "100%",
    position: "relative",
    overflowX: "hidden"
  },
  sliderSlides: {
    display: "flex"
  },
  sliderItem: {
    minWidth: "100%"
  },
  sliderImg: {
    display: "block",
    width: "100%",
    height: "auto",
    margin: "auto"
  },
  sliderBtnNext: {
    position: "absolute",
    top: 0,
    bottom: 0,
    margin: "auto",
    right: theme.spacing.unit * 3
  },
  sliderBtnPrev: {
    position: "absolute",
    top: 0,
    bottom: 0,
    margin: "auto",
    left: theme.spacing.unit * 3
  }
});

class AppSlider extends React.Component {
  state = {
    activeStep: 0,
    maxSteps: slides.length - 1
  };

  handleNext = () => {
    if (this.state.activeStep < this.state.maxSteps) {
      this.setState(prevState => ({
        activeStep: prevState.activeStep + 1
      }));
    } else {
      this.setState({ activeStep: 0 });
    }
  };

  handleBack = () => {
    if (this.state.activeStep !== 0) {
      this.setState(prevState => ({
        activeStep: prevState.activeStep - 1
      }));
    } else {
      this.setState({ activeStep: this.state.maxSteps });
    }
  };

  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };

  render() {
    const { activeStep } = this.state;
    const { classes } = this.props;

    return (
      <section className={classes.root}>
        <div className={classes.sliderContainer}>
          <div className={classes.sliderSlides}>
            <SwipeableViews
              onChangeIndex={this.handleStepChange}
              index={activeStep}
              resistance
            >
              {slides.map((step, index) => (
                <div className={classes.sliderItem} key={step.label}>
                  <img
                    className={classes.sliderImg}
                    src={step.imgPath}
                    alt={step.label}
                  />
                </div>
              ))}
            </SwipeableViews>
          </div>
          <Fab
            className={classes.sliderBtnPrev}
            color="primary"
            onClick={this.handleBack}
          >
            <KeyboardArrowLeft />
          </Fab>
          <Fab
            className={classes.sliderBtnNext}
            color="primary"
            onClick={this.handleNext}
          >
            <KeyboardArrowRight />
          </Fab>
        </div>
      </section>
    );
  }
}

export default withStyles(styles)(AppSlider);
