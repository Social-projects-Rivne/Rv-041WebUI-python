import React, { Component } from "react";

const AppContext = React.createContext();

export class AppProvider extends Component {
  state = {
    name: "123"
  };

  render() {
    return (
      <AppContext.Provider state={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
