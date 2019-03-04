import React from "react";
import { withStyles, Fab } from "@material-ui/core/";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons/";
import SwipeableViews from "react-swipeable-views";

const slides = [
  {
    label: "Some text 1",
    imgPath: "/images/HomepageSlider/marshmallow.jpg"
  },
  {
    label: "Some text 2",
    imgPath: "/images/HomepageSlider/food_relax.jpg"
  },
  {
    label: "Some text 3",
    imgPath: "/images/HomepageSlider/vegan.jpg"
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
  slider: {
    position: "relative"
  },
  sliderText: {
    position: "absolute",
    color: "#fff",
    fontSize: "25px",
    top: "10%",
    right: "20%"
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
                  <div className={classes.slider}>
                    <img
                      className={classes.sliderImg}
                      src={step.imgPath}
                      alt={step.label}
                    />
                    <div className={classes.sliderText}>{step.label}</div>
                  </div>
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
