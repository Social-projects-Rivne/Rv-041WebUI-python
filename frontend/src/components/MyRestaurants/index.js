import React from 'react';

import RestaurantItem from "../RestaurantList/RestaurantItem";


class MyRest extends React.Component {
    state = {
        rests: [],
        owner: 'Cassidy Lopez'
    };

    componentDidMount() {
        fetch('http://localhost:6543/restaurant')
            .then(response => response.json())
            .then(data => this.setState({rests: data.data}))
            .catch(err => console.log(err));
    }

    render() {
        console.log(this.state.rests);
        return (
            <div>

                {this.state.rests.map((rest) => {
                   if (rest.owner_id === this.state.owner) {
                       return <RestaurantItem
                           key={rest.id}
                           name={rest.name}
                           description={rest.description}
                           address={rest.addres_id}
                           id={rest.id}
                       />
                   }
                })}
            </div>
        )
    }
}

export default MyRest;