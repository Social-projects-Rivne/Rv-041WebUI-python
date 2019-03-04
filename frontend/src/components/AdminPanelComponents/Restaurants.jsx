import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeDate } from "../../Service/functions";


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


function Restaurants(props) {
  const { restaurantsList,
          restaurantStatus,
          classes } = props;
  return (
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
                  Owner
              </Typography>
            </TableCell>
            <TableCell align="left">
              <Typography gutterBottom variant="subtitle2" >
                  Address
              </Typography>
            </TableCell>
            <TableCell align="left">
              <Typography gutterBottom variant="subtitle2" >
                  Phone
              </Typography>
            </TableCell>
            <TableCell align="left">
              <Typography gutterBottom variant="subtitle2" >
                  Added
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantsList.map(restaurantInfo => {
        if (restaurantStatus.includes(restaurantInfo.status)) {
          return (
            <TableRow key={restaurantInfo.id}>
              <TableCell component="th" scope="row">
                {restaurantInfo.name}
              </TableCell>
              <TableCell align="left">{restaurantInfo.owner_name}</TableCell>
              <TableCell align="left">{restaurantInfo.address_id}</TableCell>
              <TableCell align="left">{restaurantInfo.phone}</TableCell>
              <TableCell align="left">{makeDate(restaurantInfo.creation_date, "simple european date")}</TableCell>
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

export default withStyles(styles)(Restaurants);
