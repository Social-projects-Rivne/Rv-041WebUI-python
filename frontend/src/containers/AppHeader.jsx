import React from "react";
import PropTypes from "prop-types";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import NavMenu from "../components/AppHeader/NavMenu";
import UserMenu from "../components/AppHeader/UserMenu";
import { Link } from "react-router-dom";
import AppContext from "../components/AppContext";

const AppHeader = props => {
  const handleBackClick = () => {
    props.history.goBack();
  };
  const { history } = props;

  const isLogIn = history.location.pathname === "/log-in";
  const isSignUp = history.location.pathname === "/sign-up";

  return (
    <AppBar position="static">
      <Toolbar style={{ justifyContent: "space-between" }}>
        {(isLogIn || isSignUp) && history.action !== "POP" ? (
          <IconButton color="inherit" onClick={handleBackClick}>
            <ArrowBack />
          </IconButton>
        ) : (
          <Typography
            style={{ textDecoration: "none" }}
            color="inherit"
            component={Link}
            to="/"
            variant="button"
          >
            Easy-rest
          </Typography>
        )}

        {!isSignUp && !isLogIn && <NavMenu />}
        <AppContext.Consumer>
          {state => (
            <UserMenu isLogIn={isLogIn} isSignUp={isSignUp} ctx={state} />
          )}
        </AppContext.Consumer>
      </Toolbar>
    </AppBar>
  );
};

AppHeader.propTypes = {
  history: PropTypes.object.isRequired
};

export default AppHeader;
