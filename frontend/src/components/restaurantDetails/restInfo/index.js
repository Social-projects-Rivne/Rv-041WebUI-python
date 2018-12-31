import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
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

function restaurantInfo(props) {
    const {classes} = props;
    console.log(props);
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
                    {/*<Grid item sm={7}>*/}
                        {/*<Grid>*/}
                            <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                                Три Слона
                            </Typography>

                            <Typography component="p" className={classes.desc}>
                                Address: м.Рівне вул. Кн.Володимира 37 <br/> Тел. 0967423274
                            </Typography>
                            <Divider variant="middle"/>
                            <Typography component="p" className={classes.desc}>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam, at autem
                                cupiditate earum eos expedita facere illo labore laborum libero molestiae natus
                                necessitatibus neque nesciunt obcaecati officiis repudiandae sapiente totam, veritatis!
                                Architecto atque ducimus est, ex nemo optio quibusdam sed voluptates. Ab, ad adipisci
                                aliquam animi aspernatur assumenda beatae, consectetur debitis deserunt dignissimos
                                doloremque dolorum ducimus esse facilis laboriosam libero minima nam nesciunt optio
                                pariatur perspiciatis praesentium quae repellendus reprehenderit sed sit suscipit
                                tempora unde vel, voluptate? Accusamus aliquam aut commodi consectetur cupiditate
                                debitis delectus doloremque dolores eum incidunt iste iusto magni, maxime neque nulla
                                obcaecati odio officiis optio perferendis placeat quae quaerat quis quisquam ratione,
                                repudiandae saepe suscipit tempora temporibus totam ullam voluptas voluptate voluptatem
                                voluptates. Aspernatur delectus, distinctio dolores ducimus ipsam saepe? Amet aut beatae
                                consectetur dolores eveniet, fuga id nobis quibusdam quo sequi sint, tempora ut.
                                Molestias nesciunt quibusdam reiciendis unde. A accusamus asperiores, consequatur
                                cupiditate, debitis dolore dolorem ducimus eveniet facere fuga, iusto maxime minima
                                mollitia pariatur reiciendis rerum tempora totam voluptatem!
                            </Typography>
                        {/*</Grid>*/}

                    {/*</Grid>*/}

                </div>


            </Card>
        </div>
    );
}

export default withStyles(styles)(restaurantInfo);