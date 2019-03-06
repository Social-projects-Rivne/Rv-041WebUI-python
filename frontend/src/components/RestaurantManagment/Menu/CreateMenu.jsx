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
  Radio,
  FormControl,
  FormLabel,
  Divider,
  TextField
} from "@material-ui/core/";

import MenuToolbar from "./MenuToolbar";
import ImageUploader from "./ImageUploader";
import MenuTable from "./MenuTable";
import { MenuContext } from "../../../containers/RestaurantManegmentPage/RestaurantManagmentPage";

const styles = theme => ({
  root: {
    width: "100%"
  },
  input: { display: "none" },
  resetContainer: {
    padding: theme.spacing.unit * 3,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

function getSteps() {
  return ["Add basic information", "Create an ad group", "Create an ad"];
}

function getStepContent(
  step,
  props,
  menuType,
  menuName,
  menuItems,
  handleFormChange,
  imgFileHandler,
  onMenuItemAddLocal
) {
  switch (step) {
    case 0:
      return (
        <AddInfo
          handleFormChange={handleFormChange}
          menuName={menuName}
          menuType={menuType}
        />
      );
    case 1:
      return (
        <FillMenu>
          {menuType === "image" ? (
            <Paper>
              <MenuContext.Consumer>
                {ctx => {
                  return <MenuToolbar ctx={ctx} menuName={menuName} />;
                }}
              </MenuContext.Consumer>
              <Divider />
              <ImageUploader imgFileHandler={imgFileHandler} />
            </Paper>
          ) : (
            <MenuTable
              onMenuItemAdd={onMenuItemAddLocal}
              menuName={menuName}
              {...props}
              menuItems={menuItems}
            />
          )}
        </FillMenu>
      );
    case 2:
      return (
        <Grid item xs={12}>
          <Typography>
            Try out different ad text to see what brings in the most customers,
            and learn how to enhance your ads using features like ad extensions.
            If you run into any problems with your ads, find out how to tell if
            they're running and how to resolve approval issues.
          </Typography>
        </Grid>
      );
    default:
      return "Unknown step";
  }
}

const AddInfo = props => {
  return (
    <>
      <Grid item xs={12}>
        <Typography gutterBottom>
          For each ad campaign that you create, you can control how much you're
          willing to spend on clicks and conversions, which networks and
          geographical locations you want your ads to show on, and more.
        </Typography>
      </Grid>
      <Grid item xs={12} onChange={props.handleFormChange}>
        <TextField
          required
          value={props.menuName}
          name="menuName"
          label="Menu Name"
          fullWidth
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} onChange={props.handleFormChange}>
        <FormControl>
          <FormLabel component="legend">Choose menu type:</FormLabel>
          <RadioGroup name="menuType" value={props.menuType}>
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
        </FormControl>
      </Grid>
    </>
  );
};

const FillMenu = props => {
  return (
    <>
      <Grid item xs={12}>
        <Typography>
          An ad group contains one or more ads which target a shared set of
          keywords.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {props.children}
      </Grid>
    </>
  );
};

class CreateMenu extends React.Component {
  state = {
    activeStep: 0,
    menuName: "",
    image: null,
    menuItems: [],
    menuType: "list",
    file: null
  };

  _getInitialState = () => {
    const initialState = {
      activeStep: 0,
      menuName: "",
      image: null,
      menuItems: [],
      menuType: "list",
      file: null
    };
    return initialState;
  };

  _resetState = () => {
    this.setState(this._getInitialState());
  };

  imgFileHandler = value => {
    this.setState({ file: value });
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
    this._resetState();
  };

  handleFormChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = () => {
    const restId = this.props.restId;
    const imgFile = this.state.file;
    let formData = new FormData();
    formData.append("img", imgFile);

    if (this.state.menuType !== "list") {
      fetch("http://localhost:6543/api/file", {
        method: "POST",
        headers: {
          "x-auth-token": localStorage.getItem("token")
        },
        body: formData
      })
        .then(response => {
          return response.status >= 200 && response.status < 300
            ? response.json()
            : response.json().then(Promise.reject.bind(Promise));
        })
        .then(response => {
          this.setState({ image: response });
        })
        .then(response => {
          let { activeStep, file, menuType, ...data } = this.state;

          fetch(`http://localhost:6543/api/restaurant/${restId}/menu`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify(data)
          })
            .then(response => {
              return response.status >= 200 && response.status < 300
                ? response.json()
                : response.json().then(Promise.reject.bind(Promise));
            })
            .then(response => {
              this.props.onAddMenu(response.data);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .then(
          this.setState(state => ({
            activeStep: state.activeStep + 1
          }))
        )
        .catch(err => {
          console.log(err);
        });
    } else {
      let { activeStep, file, menuType, ...data } = this.state;
      data.menuItems.map(item => (item["category_id"] = item.category.id));

      fetch(`http://localhost:6543/api/restaurant/${restId}/menu`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          return response.status >= 200 && response.status < 300
            ? response.json()
            : response.json().then(Promise.reject.bind(Promise));
        })
        .then(response => {
          this.props.onAddMenu(response.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  onMenuItemAddLocal = item => {
    this.setState(prevState => ({
      menuItems: [...prevState.menuItems, item]
    }));
  };

  render() {
    const { classes, ...props } = this.props;
    const steps = getSteps();
    const { activeStep, menuType, menuName, menuItems } = this.state;

    return (
      <Paper className={classes.root}>
        <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent TransitionProps={{ unmountOnExit: false }}>
                  <Grid container spacing={16} justify="space-between">
                    {getStepContent(
                      index,
                      props,
                      menuType,
                      menuName,
                      menuItems,
                      this.handleFormChange,
                      this.imgFileHandler,
                      this.onMenuItemAddLocal
                    )}
                    <Grid item xs={3}>
                      <Button
                        variant="contained"
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
                        onClick={
                          activeStep === steps.length - 1
                            ? this.handleSubmit
                            : this.handleNext
                        }
                        disabled={menuName.trim().length === 0}
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
        </form>
      </Paper>
    );
  }
}

CreateMenu.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(CreateMenu);
