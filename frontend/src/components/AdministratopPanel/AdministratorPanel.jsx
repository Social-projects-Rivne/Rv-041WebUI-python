import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import OrderListItem from "./OrderListItem";
import { Link } from "react-router-dom";

function TabContainer(props) {
    return <Typography component="div">{props.children}</Typography>;
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
};

const styles = {
    root: {
        flexGrow: 1
    },
    item: {
        marginTop: 16
    }
};

class AdministratorPanel extends React.Component {
    state = {
        orders: []
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
        fetch("http://localhost:6543/api/orders", fetchInit)
            .then(response => response.json())
            .then(data => {
                this.setState({ orders: data.data });
            })
            .catch(err => console.log(err));

    }

    render() {
        const { classes } = this.props;
        let value = 0;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={value} variant="scrollable" scrollButtons="on">
                        <Tab label="New Orders" component={Link} to={{ search: "" }} />
                        {/*<Tab label="Waiters"  />*/}
                    </Tabs>
                </AppBar>
                            <TabContainer>
                                {this.state.orders.map(order => {
                                        return <Grid key={order.id} className={classes.item}>
                                            <OrderListItem  orderData={order} />
                                        </Grid>;

                                })}
                            </TabContainer>
            </div>
        );
    }
}

AdministratorPanel.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdministratorPanel);