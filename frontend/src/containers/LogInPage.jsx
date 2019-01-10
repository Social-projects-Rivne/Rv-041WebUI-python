import React from "react";

import Login from "../components/Login";
import AppContext from "../components/AppContext"

const LogInPage = props => {
  // console.log(props)
  return ( 
	    <AppContext.Consumer>
            {(state) => <Login state={state}/>}
        </AppContext.Consumer>
  );

};

export default LogInPage;
