import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Grid, 
  Button,
  Typography,
  unstable_Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton
}from "@material-ui/core/";
import {Lock, LockOpen} from '@material-ui/icons';
import { amber, green } from "@material-ui/core/colors/index";

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function Users(props) {

  const { users, handleUserBann, userActivity, userStatus, classes } = props;
  console.log(users)

  const buttons = (userId) => {
    return {
      "0":  <Typography component="div" color="error">
              <unstable_Box fontWeight="fontWeightRegular" m={1}>Banned</unstable_Box >
              <IconButton 
                className={classes.button}
                aria-label="Banned"
                color="secondary"
                onClick={() => handleUserBann(userId)}
              >
                <Lock />
              </IconButton>
            </Typography> ,
      "1": <Typography component="div" color="primary">
              <unstable_Box fontWeight="fontWeightRegular" m={1}>Active</unstable_Box >
              <IconButton
                className={classes.button}
                aria-label="Active"
                color="primary"
                onClick={() => handleUserBann(userId)}
              >
                <LockOpen />
              </IconButton>
            </Typography>  
    };
  } 
  
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography component="h1">
                Name
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography component="h1">
                email
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography component="h1">
                Phone number
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography component="h1">
                Birth date
              </Typography>
            </TableCell>
            {userStatus === "owners" ? 
              <TableCell align="right">
                <Typography component="h1">
                  Restaurants
                </Typography>
              </TableCell>
              : null
            }
            <TableCell align="right">
              <Typography component="h1">
                Activity
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(userInfo => {
            if (userActivity.indexOf(userInfo.is_active) !== -1) {
              return (
                <TableRow key={userInfo.id}>
                  <TableCell component="th" scope="row">
                    {userInfo.name}
                  </TableCell>
                  <TableCell align="right">{userInfo.email}</TableCell>
                  <TableCell align="right">{userInfo.phone_number}</TableCell>
                  <TableCell align="right">{userInfo.birth_date}</TableCell>
                  {userStatus === "owners" ?  <TableCell align="right">
                                                {userInfo.restaurants.map(restaurantName => {
                                                  return(<Typography component="p">
                                                    {restaurantName}
                                                  </Typography>);})}
                                              </TableCell>: null}
                  <TableCell align="right">
                    {buttons(userInfo.id)[""+ userInfo.is_active]}
                  </TableCell>
                </TableRow>
              );
            } else {
              return null;
            }
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(Users);
