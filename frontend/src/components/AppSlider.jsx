import React from "react";
import { withStyles, Fab } from "@material-ui/core/";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons/";

const slides = [
  {
    label: "Some text 1",
    imgPath:
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=1200&h=500&q=60"
  },
  {
    label: "Some text 2",
    imgPath:
      "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=1200&h=500&q=60"
  },
  {
    label: "Some text 3",
    imgPath:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&h=500&q=80"
  }
];

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 8
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
    maxWidth: "100%",
    height: "auto",
    margin: "auto"
  },
  sliderBtnNext: {
    position: "absolute",
    top: 0,
    bottom: 0,
    margin: "auto",
    right: 0
  },
  sliderBtnPrev: {
    position: "absolute",
    top: 0,
    bottom: 0,
    margin: "auto",
    left: 0
  }
});

class AppSlider extends React.Component {
  state = {
    sliders: [],
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

    const sliderStyle = {
      transform: `translateX(${activeStep * -100}%)`,
      transition: "0.2s"
    };

    return (
      <section className={classes.root}>
        <div className={classes.sliderContainer}>
          <div style={sliderStyle} className={classes.sliderSlides}>
            {slides.map((step, index) => (
              <div className={classes.sliderItem} key={step.label}>
                <img
                  className={classes.sliderImg}
                  src={step.imgPath}
                  alt={step.label}
                />
              </div>
            ))}
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
