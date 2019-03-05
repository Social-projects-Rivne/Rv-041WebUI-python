import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import ExpPanel from './ExpPanel';
import WaitersSummary from './WaitersSummary'
import WaitersDetails from './WaitersDetails'


const styles = theme => ({
  
});

class WaitersWraper extends React.Component {
  state = {
    waitersWithOrders: []
  }

  componentDidMount() {
    const headers = new Headers({
      "Content-Type": "application/json",
      "X-Auth-Token": localStorage.getItem("token")
    });
    const fetchInit = {
      method: "GET",
      headers: headers
    };
    fetch("http://localhost:6543/api/waiters?with_orders=True", fetchInit)
      .then(response => response.json())
      .then(json => {
        this.setState({ waitersWithOrders: json.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <>
        {this.state.waitersWithOrders.map((waiter, index) => {
          return (
            <ExpPanel
              key={"Exp" + index}
              summary={<WaitersSummary waiter={waiter}/>}
              details={<WaitersDetails waiter={waiter}/>}
            />
          )
        })}
      </>
    )
  }
}

export default withStyles(styles)(WaitersWraper);