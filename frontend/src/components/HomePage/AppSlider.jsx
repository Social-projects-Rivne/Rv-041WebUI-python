import React from "react";
import { withStyles, Fab } from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import SwipeableViews from "react-swipeable-views";
import {Link, Typography} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";

const slides = [
  {
    label: "Some text 1",
    imgPath:
      "/images/HomepageSlider/marshmallow.jpg",
    text: "Relax With Us",
    textProperties: {
      left: "61%",
      top: "6%",
      color: "black"
    },
    restaurantName: "Johnson PLC",
    restaurantMenu: "/restaurant/2/menu/1",
    restaurantAddress: "Victor Knoll East Lindastad, CA 10851",
    restaurantNameProperties: {
      left: "72%",
      top: "32%",
      color: "black"
    },
    restaurantAddressProperties: {
      left: "72%",
      top: "40%",
      color: "black"
    }
  },
  {
    label: "Some text 2",
    imgPath:
      "/images/HomepageSlider/food_relax.jpg",
    text: "Enjoy Your Meals",
    textProperties: {
      left: "58%",
      top: "7%",
      color: "white"
    },
    restaurantName: "Preston, Terrell and Warren",
    restaurantMenu: "/restaurant/8/menu/1",
    restaurantAddress: "Kimberly Bypass Suite 107 Suttonburgh, NY 04699",
    restaurantNameProperties: {
      left: "68%",
      top: "83%",
      color: "white"
    },
    restaurantAddressProperties: {
      left: "68%",
      top: "91%",
      color: "white"
    }
  },
  {
    label: "Some text 3",
    imgPath:
      "/images/HomepageSlider/vegan.jpg",
    text: "You Are What You Eat",
    textProperties: {
      left: "3%",
      top: "19%",
      color: "white"
    },
    restaurantName: "Ball-Logan",
    restaurantMenu: "/restaurant/5/menu/1",
    restaurantAddress: "Unit 1280 Box 4854 DPO AP 93705",
    restaurantNameProperties: {
      left: "2%",
      top: "81%",
      color: "white"
    },
    restaurantAddressProperties: {
      left: "2%",
      top: "90%",
      color: "white"
    }
  }
];

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 2,
    marginTop: "64px"
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
    fontSize: "4.3vw",
    fontWeight: 300,
  },
  sliderRestaurantLink: {
    "&:hover": {
      color: "#01579b !important"
    },
    position: "absolute",
    fontSize: "2.5vw",
    fontStyle: "italic",
    fontWeight: 300,
    width: "auto"
  },
  sliderRestaurantAddress: {
    position: "absolute",
    fontSize: "1vw",
    fontStyle: "italic",
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

  componentDidMount() {
    this.timerID = setInterval(
      () => this.handleNext(), 7000
    );
  };

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

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
              {slides.map((slide) => (
                <div className={classes.sliderItem} key={slide.label}>
                  <div className={classes.slider}>
                    <img
                      className={classes.sliderImg}
                      src={slide.imgPath}
                      alt={slide.label}
                    />
                    <Typography variant="h3" className={classes.sliderText}
                                style={{
                                  left: slide.textProperties.left,
                                  top: slide.textProperties.top,
                                  color: slide.textProperties.color
                                }}
                    >
                      {slide.text}
                    </Typography>
                    <Typography variant="h5" className={classes.sliderRestaurantLink}
                                style={{
                                  left: slide.restaurantNameProperties.left,
                                  top: slide.restaurantNameProperties.top,
                                  color: slide.restaurantNameProperties.color
                                }}
                    >
                      <Link component={RouterLink} to={slide.restaurantMenu} underline={"none"} color={"inherit"}>
                        {slide.restaurantName}
                      </Link>
                    </Typography>
                    <Typography variant="h6" className={classes.sliderRestaurantAddress}
                                style={{
                                  left: slide.restaurantAddressProperties.left,
                                  top: slide.restaurantAddressProperties.top,
                                  color: slide.restaurantAddressProperties.color
                                }}
                    >
                      {slide.restaurantAddress}
                    </Typography>
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
