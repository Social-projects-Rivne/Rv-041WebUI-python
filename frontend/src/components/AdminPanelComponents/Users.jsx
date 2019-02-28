import React from "react";
import {Link} from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import {Lock, LockOpen} from '@material-ui/icons';
import { format } from "date-fns";
import {
  Button,
  IconButton,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  buttonModerator: {
    marginTop: theme.spacing.unit * 3,
  },
});

function Users(props) {

  const { users, handleUserActivity, userActivity, userStatus, classes } = props;

  const buttons = (userId) => {
    return {
      "false":  
        <IconButton
          className={classes.button}
          color="secondary"
          onClick={() => handleUserActivity(userId)}
        >
          <Lock />
        </IconButton>,
      "true": 
        <IconButton
          className={classes.button}
          color="primary"
          onClick={() => handleUserActivity(userId)}
        >
          <LockOpen />
        </IconButton>
    };
  };
  
  return (
    <>
      {userStatus === 3 ?
        <Button
          component={Link}
          to={'/admin/moderators/create'}
          variant="contained"
          color="primary"
          className={classes.buttonModerator}
        >
          Add moderator
        </Button>
        : null
      }

      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography gutterBottom variant="subtitle2" >
                    Name
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography gutterBottom variant="subtitle2" >
                    Email
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography gutterBottom variant="subtitle2" >
                    Phone number
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography gutterBottom variant="subtitle2" >
                    Birth date
                </Typography>
              </TableCell>
              {userStatus === "owners" ?
                <TableCell align="left">
                  <Typography gutterBottom variant="subtitle2" >
                      Restaurants
                  </Typography>
                </TableCell>
                : null
              }
              <TableCell align="left">
                <Typography gutterBottom variant="subtitle2" >
                    Activity
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography gutterBottom variant="subtitle2" >
                    Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((userInfo, id) => {
              if (userActivity.indexOf(userInfo.is_active) !== -1) {
                return (
                  <TableRow key={id}>
                    <TableCell component="th" scope="row">
                      {userInfo.name}
                    </TableCell>
                    <TableCell align="left">{userInfo.email}</TableCell>
                    <TableCell align="left">{userInfo.phone_number}</TableCell>
                    <TableCell align="left">{format(userInfo.birth_date, "dd.MM.yyyy")}</TableCell>
                    <TableCell align="left">
                      <Typography component="p" color={userInfo.is_active ? "primary" : "error"}>
                          {userInfo.is_active ? "Active" : "Banned"}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      {buttons(userInfo.id)[userInfo.is_active.toString()]}
                    </TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}

export default withStyles(styles)(Users);
