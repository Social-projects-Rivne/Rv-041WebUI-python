import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


function GeneralError(props) {
  const { classes, error } = props;

  return (
     <Grid container >
        <Grid item xs={12}>
          <Grid
            container
            alignItems='center'
            justify='center'
          >
            <Typography variant="h5" component="h3">
                Oooops, something went wrong...
            </Typography>
                <img src="https://render.fineartamerica.com/images/rendered/default/poster/8.000/8.000/break/images-medium-5/broken-plate-science-photo-library.jpg" />
            <Typography component="p">
                {error}
            </Typography>
          </Grid>
        </Grid>
     </Grid>
  );
}

GeneralError.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (GeneralError);