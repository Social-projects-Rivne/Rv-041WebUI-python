import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        flexGrow: 1,
        maxWidth: 345,
        width: "50%",
        float: "left",
        margin: 16,

    },
    media: {
        height: 330,
    },
};

class UserAvatar extends React.Component {

    render() {
        const {classes} = this.props;
        const {userInfo} = this.props;

        return (
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="https://previews.123rf.com/images/salamatik/salamatik1801/salamatik180100019/92979836-ic%C3%B4ne-de-visage-anonyme-de-profil-personne-silhouette-grise-avatar-par-d%C3%A9faut-masculin-photo-placeholder-.jpg"
                  title="You"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {userInfo.name}
                  </Typography>
                  <Typography component="p">
                    Common user
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
        );
    }

}


export default withStyles(styles)(UserAvatar);
