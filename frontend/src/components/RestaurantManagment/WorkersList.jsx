import React from "react";
import PropTypes from "prop-types";

import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  IconButton,
  withStyles
} from "@material-ui/core/";
import IconDelete from "@material-ui/icons/Delete";

const styles = theme => ({
  item: {
    transition: theme.transitions.create("background-color"),
    "&:hover": {
      backgroundColor: theme.palette.action.hover
    }
  }
});

const WorkersList = props => {
  const { workers, classes } = props;
  return (
    <List>
      {workers.map(worker => (
        <ListItem className={classes.item} key={worker.id}>
          <ListItemAvatar>
            <Avatar>{worker.name.slice(0, 1).toUpperCase()}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={worker.name}
            secondary={
              <Typography component="span" color="textPrimary">
                {worker.phone_number} / {worker.email}
              </Typography>
            }
          />
          <IconButton onClick={props.onDelete}>
            <IconDelete fontSize="small" />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

WorkersList.propTypes = {
  workers: PropTypes.array.isRequired
};

export default withStyles(styles)(WorkersList);
