import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton
}from "@material-ui/core/";
import {Lock, LockOpen} from '@material-ui/icons';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    /*minWidth: 700,*/
  },
});

function Users(props) {

  const { users, handleUserBann, userActivity, userStatus, classes } = props;
  console.log(users)

  const buttons = (userId) => {
    return {
      "0":  
        <IconButton
          className={classes.button}
          color="secondary"
          onClick={() => handleUserBann(userId)}
        >
          <Lock />
        </IconButton>,
      "1": 
        <IconButton
          className={classes.button}
          color="primary"
          onClick={() => handleUserBann(userId)}
        >
          <LockOpen />
        </IconButton>
    };
  } 
  
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography gutterBottom variant="h6" >
                  Name
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography gutterBottom variant="h6" >
                  email
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography gutterBottom variant="h6" >
                  Phone number
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography gutterBottom variant="h6" >
                  Birth date
              </Typography>
            </TableCell>
            {userStatus === "owners" ? 
              <TableCell align="right">
                <Typography gutterBottom variant="h6" >
                    Restaurants
                </Typography>
              </TableCell>
              : null
            }
            <TableCell align="right">
              <Typography gutterBottom variant="h6" >
                  Activity
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography gutterBottom variant="h6" >
                  Actions
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
                    <Typography component="p" color={userInfo.is_active ? "primary" : "error"}>
                        {userInfo.is_active ? "Active" : "Banned"}
                    </Typography>  
                  </TableCell>
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
