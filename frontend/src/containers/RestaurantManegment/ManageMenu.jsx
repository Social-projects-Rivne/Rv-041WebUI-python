import React from "react";

class ManageMenu extends React.Component {
  state = {
    menuItems: {},
    categories: []
  };

  componentDidMount() {
    const restId = this.props.match.params.id;
    console.log(this.props);
    const menuId = 1;
    fetch(`http://localhost:6543/api/restaurant/${restId}/menu/${menuId}`, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token")
      }
    })
      .then(response => {
        return response.status >= 200 && response.status < 300
          ? response.json()
          : response.json().then(Promise.reject.bind(Promise));
      })
      .then(json => {
        this.setState({
          categories: json.data.Categories,
          menuItems: json.data.Items
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        {/* <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Name</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Fat (g)</TableCell>
                <TableCell align="right">Carbs (g)</TableCell>
                <TableCell align="right">Protein (g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper> */}
      </div>
    );
  }
}

export default ManageMenu;
