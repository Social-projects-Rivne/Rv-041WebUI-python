import React from 'react';
// import SearchRestaurant from './searchRestaurant';
import TagsTab from './tagsTab';
import './style.css';
const RestaurantsListPage = (props) => {
    return (
        <div className="container-main">
            {/*<SearchRestaurant />*/}
            <TagsTab url={props} />
        </div>
    )
};
export default RestaurantsListPage;