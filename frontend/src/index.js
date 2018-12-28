import React from "react";
import ReactDOM from "react-dom";
import Router from "./components/router/router";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Router />
  </BrowserRouter>,
  document.getElementById("root")
);
