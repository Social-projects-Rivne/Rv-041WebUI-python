import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardMedia,
  CardContent,
  Grid,
  Typography,
  Fab
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";


const styles = theme => ({
  card: {
    flexGrow: 1,
    maxWidth: 345,
    width: "50%",
    margin: 16,
    position: "relative",
    backgroundSize: "contain",
    "&:hover $media": {
      transform: "scale(1.1)"
    },
    "&:hover $mask": {
      opacity: 0.7
    }
  },
  media: {
    height: 330,
    transition: theme.transitions.create("transform", { duration: 1000 }),
    cursor: "pointer"
  },
  mask: {
    transition: theme.transitions.create("opacity", { duration: 1000 }),
    display: "flex",
    opacity: 0,
    padding: "8px",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    backgroundColor: "#000",
    color: "#fff",
    fontWeight: "bold"
  },
  textField: {
    "& $input": {
      color: "#fff",
      fontSize: "14px",
      fontWeight: "400"
    }
  },
  button: {}
});

function UserAvatar(props){

  const { classes, userInfo, handleImageChange } = props;

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={ userInfo.img ? userInfo.img : "https://previews.123rf.com/images/salamatik/salamatik1801/salamatik180100019/92979836-ic%C3%B4ne-de-visage-anonyme-de-profil-personne-silhouette-grise-avatar-par-d%C3%A9faut-masculin-photo-placeholder-.jpg" }
        title="You"
      />

      <div className={classes.mask}>
        <Grid container justify="flex-end">
          <Grid item>

            <input
              onChange={handleImageChange}
              accept="image/*"
              style={{ display: "none" }}
              id="icon-edit-file"
              type="file"
            />

            <label htmlFor="icon-edit-file">
              <Fab color="primary" component="span" >
                <Edit />
              </Fab>
            </label>

          </Grid>
        </Grid>
      </div>

      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {userInfo.name}
        </Typography>
        <Typography component="p">{localStorage.getItem("role")}</Typography>
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(UserAvatar);
