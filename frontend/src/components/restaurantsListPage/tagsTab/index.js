import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
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
        fontSize: 20,
        fontWeight: 600
    }
});

class TagsTab extends React.Component {
    state = {
        value: 0,
        rests: []
    };

    componentDidMount() {
        fetch('http://localhost:6543/restaurant')
            .then(response => response.json())
            .then(data => this.setState({rests: data.data}));

    }

    handleChange = (event, value) => {
        this.setState({value});
    };

    handleGetTags=( rests)=>{
        let tagNames=[];
        rests.map(item=> item.tags.map(tag=>{
            if (tagNames.indexOf(tag.name) === -1)
            tagNames.push(tag.name);
        }));
        return tagNames;
    };

    render() {
        const {classes} = this.props;
        const {value} = this.state;
        const tagNames=this.handleGetTags(this.state.rests);

        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.appbar}>
                    <Tabs value={value} onChange={this.handleChange} scrollable scrollButtons="on">
                        <Tab label="View all" className={classes.tabs}/>
                        {tagNames.map(i=>{
                            return <Tab key={i} label={i} value={i} className={classes.tabs}/>
                        })}
                    </Tabs>
                </AppBar>
                {value === 0 && <TabContainer>

                    {this.state.rests.map((item) => {
                        return <RestaurantItem
                            key={item.id}
                            Name={item.name}
                            Description={item.description}
                            Address={item.addres_id}
                            Id={item.id}
                        />
                    })}
                </TabContainer>}
                {tagNames.map(i=>{
                    if(value === i){
                    return <TabContainer>
                        {this.state.rests.map((item) => {
                            if (item.tags.filter(p => p.name === value).length !== 0) {
                                return <RestaurantItem
                                    key={item.id}
                                    Name={item.name}
                                    Description={item.description}
                                    Address={item.addres_id}
                                    Id={item.id}
                                />
                            }
                            return '';
                        })}
                    </TabContainer>}})}
            </div>
        );
    }
}

TagsTab.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TagsTab);