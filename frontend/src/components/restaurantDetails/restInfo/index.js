    //
    // const {classes} = props;
    // const restId =props.url.match.params.Id;
    // console.log(props.url);
    import React from 'react';
    import {withStyles} from '@material-ui/core/styles';
    import Card from '@material-ui/core/Card';
    import Divider from '@material-ui/core/Divider';

    import CardMedia from '@material-ui/core/CardMedia';
    import Button from '@material-ui/core/Button';
    import Typography from '@material-ui/core/Typography';
    import Grid from '@material-ui/core/Grid';

    const styles = {
        card: {
            width: 1200,
            background: 'rgba(230, 232, 209, 0.96)',
            marginTop: 7,
            borderRadius: 5
        },
        media: {
            height: 295,
            width: 460
        },
        media_small:{
            height: 140,
            width: 140
        },
        title: {
            fontWeight: 700,
            border: "solid black 1px",
            marginTop: 10,
            padding: 10,
            marginRight: 17
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
        padding: 0
    };

    class restaurantInfo extends React.Component {

        state={
            restInfo:[]
        };

        componentDidMount() {
            fetch('http://localhost:6543/restaurant')
                .then(response => response.json())
                .then(data => this.setState({restInfo: data.data[this.props.url.match.params.Id-1]}));
            console.log("ok");

        }
        render(){
            const {classes} = this.props;
            const {restInfo} = this.state;
            console.log(restInfo);
            // console.log(this.props.url);
            return (
                <div className={classes.root}>

                    <Card className={classes.card}>

                        <div>
                            <div>
                                <CardMedia
                                    className={classes.media}
                                    image="https://media-cdn.tripadvisor.com/media/photo-f/04/43/20/9c/whisky-corner.jpg"
                                    title={"ok"}
                                />
                                <Typography component="p" className={classes.desc}>
                                    LISTIMAGES WILL BE HERE
                                </Typography>
                            </div>

                            <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                                {restInfo.name}
                            </Typography>

                            <Typography component="p" className={classes.desc}>
                                Address: {restInfo.addres_id}
                            </Typography>
                            <Divider variant="middle"/>
                            <Typography component="p" className={classes.desc}>
                                {restInfo.description}
                            </Typography>


                        </div>


                    </Card>
                </div>
            );
        }

    }



    export default withStyles(styles)(restaurantInfo);
