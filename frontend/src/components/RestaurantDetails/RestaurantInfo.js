import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';

import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";

const styles = {
    media: {
        height: 330,
        width: "50%",
        float: "left",
        marginRight: 16
    },
    root:{
        margin:16
    }
};

class restaurantInfo extends React.Component {

    state = {
        restInfo: []
    };

    componentDidMount() {
        fetch('http://localhost:6543/api/restaurant/'+ this.props.url.match.params.id)
            .then(response => response.json())
            .then(data => this.setState({restInfo: data.data[0]}))
            .catch(err=>console.log(err))
    }

    render() {
        const {classes} = this.props;
        const {restInfo} = this.state;
        return (
            <div className={classes.root}>
                <Card>

                    <CardMedia
                        className={classes.media}
                        image="https://www.omnihotels.com/-/media/images/hotels/bospar/restaurants/bospar-omni-parker-house-parkers-restaurant-1170.jpg"
                        title={"ok"}
                    />
                    <Typography gutterBottom variant="h3">
                        {restInfo.name}
                    </Typography>
                    <Typography component="p" variant="h5">
                        Address: {restInfo.addres_id} <br/>
                        Works hour: 10.00 - 23.00 <br/>
                        Phone: 093-999-23-08
                    </Typography>
                    <Divider variant="middle" style={{marginTop:"10px"}}/>
                    <Typography component="p" variant="h5">
                        {restInfo.description}{restInfo.description}
                    </Typography>
                    <Typography align="right" style={{margin:10}}>
                        <Button component={Link} to={'menu/' + restInfo.id} variant="contained" color="primary">
                            see menu
                        </Button>
                    </Typography>
                </Card>

            </div>
        );
    }

}


export default withStyles(styles)(restaurantInfo);
