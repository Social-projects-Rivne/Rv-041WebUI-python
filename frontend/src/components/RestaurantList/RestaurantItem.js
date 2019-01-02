import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import {Link} from 'react-router-dom';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = {
    card: {
        background: 'rgba(230, 232, 209, 0.96)',
        marginTop: 8
    },
    media: {
        height: 305,
        width: 460
    }
};

function restaurantItem(props) {
    const {classes, id, name, description, address} = props;


    return (
        <div className={classes.root}>

            <Card>

                <Grid container alignItems={"center"}>
                    <Grid item sm={3}>
                        <CardMedia
                            className={classes.media}
                            image="https://media-cdn.tripadvisor.com/media/photo-f/04/43/20/9c/whisky-corner.jpg"
                            title={name}
                        />
                    </Grid>
                    <Grid item sm={9}>
                        <Grid>
                            <Typography gutterBottom variant="h5" component="h2">
                                {name}
                            </Typography>

                            <Typography component="p">
                                {description}
                            </Typography>
                        </Grid>
                        <Grid container justify="space-between" alignItems={"baseline"}>
                            <Typography component="p">
                                Address : {address}
                            </Typography>
                            <Typography align={"right"}>
                                <Button component={Link} to={'/restaurants/' + id} size="small" color="primary">
                                    go to details
                                </Button>
                                <Button component={Link} to={'rest/menu/' + id} size="small" color="primary">
                                    Watch menu
                                </Button>
                            </Typography>
                        </Grid>
                    </Grid>

                </Grid>


            </Card>
        </div>
    );
}

export default withStyles(styles)(restaurantItem);