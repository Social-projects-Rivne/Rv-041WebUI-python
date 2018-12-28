import React from "react";
import ReactDOM from "react-dom";
import PageContainer from "./containers/PageContainer";
import "./index.css";
import AppSlider from "./components/AppSlider";
import TagsList from "./components/TagsList";
import { Grid } from "@material-ui/core";

ReactDOM.render(
  <PageContainer>
    <Grid container spacing={24}>
      <Grid item xs={12}>
        <AppSlider />
      </Grid>
      {/* <Grid item xs={12}>
        <TagsList />
      </Grid> */}
    </Grid>
  </PageContainer>,
  document.getElementById("root")
);
