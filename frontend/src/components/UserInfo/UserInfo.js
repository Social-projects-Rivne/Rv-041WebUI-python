import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const styles = {
    root: {
        flexGrow: 1,
        maxWidth: "50%",
    },
    table: {

    },
    cardStyle: {
        width: "100%",
        float: "left",
        margin: 16,
    }
}

class UserInfo extends React.Component {

    render() {
        const {classes} = this.props;
        const {userInfo} = this.props;

        return (
            <div className={classes.root}>
                <Card className={classes.cardStyle}>

                    <Table className={classes.table}>
                        <TableBody>
                            <TableRow key={1}>
                                <TableCell component="th" scope="row">
                                  Name:
                                </TableCell>
                                <TableCell align="right">{userInfo.name}</TableCell>
                             </TableRow>
                            <TableRow key={2}>
                                <TableCell component="th" scope="row">
                                  Birth date:
                                </TableCell>
                                <TableCell align="right">{userInfo.birth_date}</TableCell>
                             </TableRow>
                            <TableRow key={3}>
                                <TableCell component="th" scope="row">
                                  Email:
                                </TableCell>
                                <TableCell align="right">{userInfo.email}</TableCell>
                             </TableRow>
                            <TableRow key={4}>
                                <TableCell component="th" scope="row">
                                  Phone number:
                                </TableCell>
                                <TableCell align="right">{userInfo.phone_number}</TableCell>
                             </TableRow>
                        </TableBody>
                    </Table>

                </Card>

            </div>
        );
    }

}


export default withStyles(styles)(UserInfo);
