import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import {NavLink} from 'react-router-dom';


import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = {
    card: {
        width: 1200,
        background: 'rgba(230, 232, 209, 0.96)',
        marginTop: 7,
        borderRadius: 20
    },
    media: {
        height: 195,
        width: 260
    },
    title: {
        fontWeight: 700
    },
    desc: {
        marginBottom: 10,
        fontSize: 16
    },
    adr: {
        fontSize: 16
    },
    btn: {
        textDecoration: "none",
        color: "black",
        fontWeight: 600,
        border: "solid black 2px",
        height: 35,
        width: 120,
        marginRight: 20

    },
    nav: {
        textDecoration: "none"
    },
    padding:0
};

function restaurantItem(props) {
    const {classes} = props;
    return (
        <div className={classes.root}>

            <Card className={classes.card}>

                <Grid container alignItems={"center"}>
                    <Grid item sm={3}>
                        <CardMedia
                            className={classes.media}
                            image="https://media-cdn.tripadvisor.com/media/photo-f/04/43/20/9c/whisky-corner.jpg"
                            title={props.Name}
                        />
                    </Grid>
                    <Grid item sm={9}>
                        <Grid>
                            <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                                {props.Name}
                            </Typography>

                            <Typography component="p" className={classes.desc}>
                                {props.Description}
                            </Typography>
                        </Grid>
                        <Grid container justify="space-between" alignItems={"baseline"}>
                            <Typography component="p" className={classes.adr}>
                                Address : {props.Address}
                            </Typography>
                            <Typography align={"right"}>
                                <NavLink to={'/' + props.Id} className={classes.nav}>
                                    <Button size="small" color="primary" className={classes.btn}>
                                        go to details
                                    </Button>
                                </NavLink>
                                <NavLink to={'/' + props.Id} className={classes.nav}>
                                    <Button size="small" color="primary" className={classes.btn}>
                                        Watch menu
                                    </Button>
                                </NavLink>
                            </Typography>
                        </Grid>
                    </Grid>

                </Grid>


            </Card>
        </div>
    );
}

export default withStyles(styles)(restaurantItem);