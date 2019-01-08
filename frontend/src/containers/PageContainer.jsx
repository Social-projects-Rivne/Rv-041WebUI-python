import React, { Component } from "react";
// import { withRouter } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import UserMenu from "../components/UserMenu";

class PageContainer extends Component {
  render() {
    return (
      <>
        <AppHeader />
        <main>{this.props.children}</main>
      </>
    );
  }
}

export default PageContainer;
