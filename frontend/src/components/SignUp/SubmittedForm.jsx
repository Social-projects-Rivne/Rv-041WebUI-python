import React from "react";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { Link } from 'react-router-dom'

class SubmittedForm extends React.Component {
  render() {
    const {classes} = this.props;
    return (
      <div>
        <Grid container justify='center' className={classes.form}>
          <Typography variant="h4" align='center'>
            {this.props.message}
          </Typography>
          <Grid container direction='column' alignItems='center'>
            <Grid item>
              <Button component={Link} to={'/'} variant="outlined" className={classes.button}>
                Go to homepage
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default SubmittedForm;