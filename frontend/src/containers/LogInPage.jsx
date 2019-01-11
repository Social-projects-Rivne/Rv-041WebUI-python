import React from "react";

import Login from "../components/Login";
import AppContext from "../components/AppContext"

const LogInPage = props => {
  return ( 
	    <AppContext.Consumer>
            {(state) => {
            	if (state.auth) {
            		props.history.push("/restaurants")
            	} else {
            		return	<Login history={props.history} state={state}/>	
            	}
            }}
        </AppContext.Consumer>
  );

};

export default LogInPage;
