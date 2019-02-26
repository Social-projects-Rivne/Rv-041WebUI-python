import React from "react";
import {
    withStyles,
    Card,
    Divider,
    Typography,
    CardContent,
    Button,
    Grid,
    CardMedia
} from "@material-ui/core/";
import NativeSelect from '@material-ui/core/NativeSelect';
import { Link } from "react-router-dom";
import { amber, green, red } from "@material-ui/core/colors/index";
import OrderItemsList from "../MenuPage/OrderItemsList";

const styles = theme => ({
    root: {},
    active: {
        background: green[500]
    },
    notApproved: {
        background: amber[700]
    },
    btn: {
        background: red[700],
        color: "white"
    },
    card: {
        marginTop: 48
    },
    media: {
        flex: 1,
        minWidth: theme.spacing.unit * 30,
        minHeight: theme.spacing.unit * 30
    }
});
const deleteStatus = 2;
// function handleRestaurantDelete() {
//     const headers = new Headers({
//         "Content-Type": "application/json",
//         "X-Auth-Token": localStorage.getItem("token")
//     });
//
//     const fetchInit = {
//         method: "PUT",
//         headers: headers,
//         body: JSON.stringify({
//             id: this.props.restInfo.id,
//             status: this.props.restInfo.status
//         })
//     };
//
//     fetch("http://localhost:6543/api/delete_restaurant", fetchInit).then(
//         response =>
//             !(response.status >= 200 && response.status < 300)
//                 ? Promise.reject(response.status)
//                 : response.json()
//     );
// }

class OrderItem extends React.Component {
    state = {
        rests: []
    };
    componentDidMount() {
        const headers = new Headers({
            "Content-Type": "application/json",
            "X-Auth-Token": localStorage.getItem("token")
        });
        const fetchInit = {
            method: "GET",
            headers: headers,
        };
        fetch(`http://localhost:6543/api/order/${window.location.pathname.match(/\d+/)[0]}/status`, fetchInit)
            .then(response => response.json())
            .then(data => {
                this.setState({ rests: data.data });
            })
            .catch(err => console.log(err));
    }
    render() {
        console.log(window.location.pathname.match(/\d+/)[0]);
        console.log(this.state.rests.items);
        const { classes, auth, ableUpdate } = this.props;
        const restInfo ={
            title: "sometext",
            name: "Vitalii Bondar",
            description: "fdffdf",
            phone: "dsdsa",
            id: "13",
            date: "29.02.2019 19.00",
            dateCreate: "27.02.2019 17.42"

        };
        const list = this.state.rests.items || [];
        return (
            <Card className={classes.card}>
                <CardContent>
                    <Grid container spacing={16}>
                        <Grid container
                              xs={12}
                              justify="space-between"
                              alignItems="center">
                            <Typography gutterBottom variant="h6">
                                Order id#{restInfo.id}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="p">
                                User: {restInfo.name}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="p">
                                Date created: {restInfo.dateCreate}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Divider />

                    <Grid container spacing={16}>
                        <Grid container
                              xs={12}
                              justify="space-between"
                              alignItems="center">
                            <Typography gutterBottom variant="h6">
                                Booking date: {restInfo.date}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="p">
                                People: 7
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid container spacing={16}>
                        <Grid container
                              xs={12}
                              justify="space-between"
                              alignItems="center">
                            <Typography gutterBottom variant="h6">
                               Select waiter
                            </Typography>
                            <NativeSelect
                                // value={this.state.age}
                                // onChange={this.handleChange}
                                // input={<BootstrapInput name="age" id="age-customized-native-simple" />}
                            >
                                <option value="" />
                                <option value={10}>John</option>
                                <option value={20}>Tom</option>
                                <option value={30}>Kenny</option>
                            </NativeSelect>
                        </Grid>
                    </Grid>




                    <Grid container spacing={16}>
                        <Grid container
                              xs={12}
                              justify="space-between"
                              alignItems="center">
                            <Button
                                variant="contained"
                                component={Link}
                                to={"/administrator-panel"}
                                color="primary"
                            >
                                approve
                            </Button>
                            <Button
                                variant="contained"
                                component={Link}
                                to={"/administrator-panel"}
                                color="primary"
                            >
                                disapprove
                            </Button>
                        </Grid>
                    </Grid>
                    <OrderItemsList cartItems={list}/>
                </CardContent>
            </Card>

        );
    }
}

export default withStyles(styles)(OrderItem);