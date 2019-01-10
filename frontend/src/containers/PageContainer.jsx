import React, { Component } from "react";
// import { withRouter } from "react-router-dom";
import AppHeader from "../components/AppHeader";

class PageContainer extends Component {
  render() {
    return (
      <>
        <AppHeader />
        <main style={{ maxWidth: 1280, margin: "0 auto" }}>
          {this.props.children}
        </main>
      </>
    );
  }
}

export default PageContainer;
