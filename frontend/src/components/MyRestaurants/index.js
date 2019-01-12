import React from 'react';

import RestaurantItem from "../RestaurantList/RestaurantItem";


class MyRest extends React.Component {
    state = {
        rests: [],
        owner: '2'
    };

    componentDidMount() {
        fetch(`http://localhost:6543/my_restaurant/${this.state.owner}`)
            .then(response => response.json())
            .then(data => this.setState({rests: data.data}))
            .catch(err => console.log(err));
    }

    render() {
        console.log(this.state.rests);
        return (
            <div>

                {this.state.rests.map((rest) => {
                       return <RestaurantItem
                           key={rest.id}
                           name={rest.name}
                           description={rest.description}
                           address={rest.addres_id}
                           id={rest.id}
                       />
                })}
            </div>
        )
    }
}

export default MyRest;