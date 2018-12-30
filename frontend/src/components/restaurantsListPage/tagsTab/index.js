import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import RestaurantItem from '../restaurantItem';

function TabContainer(props) {
    return (
        <Typography component="div">
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    appbar: {
        backgroundColor: 'rgba(230, 232, 209, 0.96)',
        color: "black",
        borderRadius: 7,
    },
    tabs: {
        fontSize: 25,
        fontWeight: 600
    }
});

class TagsTab extends React.Component {
    state = {
        value: 0,
        rests:[]
    };

    componentDidMount() {
        fetch('http://localhost:6543/restaurant')
            .then(response => response.json())
            .then(data => this.setState({rests: data.data}));
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div className={classes.root}>
                {/*{console.log(this.state.rests)}*/}
                <AppBar position="static" className={classes.appbar}>
                    <Tabs value={value} onChange={this.handleChange} centered={true} >
                        <Tab label="View all" className={classes.tabs} />
                        <Tab label="sushi" className={classes.tabs} />
                        <Tab label="pub" className={classes.tabs} />
                        <Tab label="vegetarian" className={classes.tabs} />
                        <Tab label="greel" className={classes.tabs} />
                        <Tab label="fast food" className={classes.tabs} />
                    </Tabs>
                </AppBar>
                {value === 0 && <TabContainer>

                    {  this.state.rests.map((item) => {
                    return <RestaurantItem
                    key={item.id}
                    Name={item.name}
                    Description={item.description}
                    Address={item.addres_id}
                    Id={item.id}
                    />
                    })}

                </TabContainer>}
                {value === 1 && <TabContainer>
                    {  this.state.rests.map((item) => {
                         if (item.tags.filter(p => p.name === "sushi").length !== 0) {
                        return <RestaurantItem
                            key={item.id}
                            Name={item.name}
                            Description={item.description}
                            Address={item.addres_id}
                            Id={item.id}
                        />}
                    })}
                </TabContainer>}
                {value === 2 && <TabContainer>
                    {  this.state.rests.map((item) => {
                        if (item.tags.filter(p => p.name === "pub").length !== 0) {
                            return <RestaurantItem
                                key={item.id}
                                Name={item.name}
                                Description={item.description}
                                Address={item.addres_id}
                                Id={item.id}
                            />}
                    })}
                </TabContainer>}
                {value === 3 && <TabContainer>
                    {  this.state.rests.map((item) => {
                        if (item.tags.filter(p => p.name === "vegetarian").length !== 0) {
                            return <RestaurantItem
                                key={item.id}
                                Name={item.name}
                                Description={item.description}
                                Address={item.addres_id}
                                Id={item.id}
                            />}
                    })}
                </TabContainer>}
                {value === 4 && <TabContainer>
                    {  this.state.rests.map((item) => {
                        if (item.tags.filter(p => p.name === "greel").length !== 0) {
                            return <RestaurantItem
                                key={item.id}
                                Name={item.name}
                                Description={item.description}
                                Address={item.addres_id}
                                Id={item.id}
                            />}
                    })}
                </TabContainer>}
                {value === 5 && <TabContainer>
                    {  this.state.rests.map((item) => {
                        if (item.tags.filter(p => p.name === "fast food").length !== 0) {
                            return <RestaurantItem
                                key={item.id}
                                Name={item.name}
                                Description={item.description}
                                Address={item.addres_id}
                                Id={item.id}
                            />}
                    })}
                </TabContainer>}
            </div>
        );
    }
}

TagsTab.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TagsTab);