import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

function Users(props) {
  const { users, handleRestaurantApprovement, restaurantStatus } = props;

  return (
    <div>
      {users.map((user) => {
        return(
          <h1> {user.name} </h1>
        )
      })}
    </div>
  );
}

export default Users;
