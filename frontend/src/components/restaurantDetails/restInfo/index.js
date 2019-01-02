import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';

import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";

const styles = {
    card: {
        width: 1200,
        background: 'rgba(230, 232, 209, 0.96)',
        marginTop: 7,
        borderRadius: 5
    },
    media: {
        height: 330,
        width: "50%",
        float: "left",
        marginRight: 15
    },
    title: {
        fontWeight: 700,
        marginRight: 17,
        fontSize: 43,
        letterSpacing: 2
    },
    desc: {
        marginBottom: 10,
        fontSize: 22,
        padding: 15,
        lineHeight: "150%",
        color: "#585a59"
    },
    adr: {
        fontSize: 19,
        color:"rgba(64, 66, 54, 0.85)"
    },
    button:{
        marginLeft:230
    }
};

class restaurantInfo extends React.Component {

    state = {
        restInfo: []
    };

    componentDidMount() {
        fetch('http://localhost:6543/restaurant')
            .then(response => response.json())
            .then(data => this.setState({restInfo: data.data[this.props.url.match.params.Id - 1]}));
        console.log("ok");

    }

    render() {
        const {classes} = this.props;
        const {restInfo} = this.state;
        console.log(restInfo);
        // console.log(this.props.url);
        return (
            <div className={classes.root}>
                <Card className={classes.card}>

                    <CardMedia
                        className={classes.media}
                        image="https://www.omnihotels.com/-/media/images/hotels/bospar/restaurants/bospar-omni-parker-house-parkers-restaurant-1170.jpg"
                        title={"ok"}
                    />
                    <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                        {restInfo.name}
                    </Typography>
                    <Typography component="p" className={classes.adr}>
                        Address: {restInfo.addres_id} <br/>
                        Works hour: 10.00 - 23.00 <br/>
                        Phone: 093-999-23-08
                        <Button component={Link} to={'menu/' + restInfo.id} variant="outlined" className={classes.button}>
                            Watch menu
                        </Button>
                    </Typography>
                    <Divider variant="middle" style={{marginTop:"10px"}}/>
                    <Typography component="p" className={classes.desc}>
                        {restInfo.description}{restInfo.description}
                    </Typography>


                </Card>

            </div>
        );
    }

}


export default withStyles(styles)(restaurantInfo);
