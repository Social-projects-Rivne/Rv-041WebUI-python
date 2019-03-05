import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PageContainer from "../../containers/PageContainer";

function GeneralError(props) {
  const { error } = props;

  return (
    <PageContainer>
      <Grid container>
        <Grid item xs={12}>
          <Grid container alignItems="center" justify="center">
            <Typography variant="h5" component="h3">
              Oooops, something went wrong...
            </Typography>
            <img src="../images/general_error.png" />
            <Typography component="p">{error}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
}

GeneralError.propTypes = {
  classes: PropTypes.object.isRequired
};

export default GeneralError;
