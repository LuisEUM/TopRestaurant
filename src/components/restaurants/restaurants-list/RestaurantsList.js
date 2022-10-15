import React, { useState, useEffect } from 'react';
import * as restaurantservice from '../../../services/top-restaurant-service';
import AddressBar from '../../ui/address-bar/AddressBar';
import RestaurantItem from '../restaurant-item/RestaurantItem';

function  RestaurantsList  () {
  const [restaurants, setRestaurants] = useState([]);
  
  useEffect(() => {
    restaurantservice.getRestaurants()
      .then(restaurants => setRestaurants(restaurants))
      .catch(error => console.error(error));
  }, [])

  if (restaurants === []) {
    return (
      <>
        <AddressBar to="/" title="Loading..." />
        <div className="full-height d-flex justify-content-center align-items-center bg-primary ">
          <p className="text-white">loading...</p>
        </div>
      </>
    );
  }

  return (
    <div className="row row-cols-1 justify-content-center row-cols-sm-2 row-cols-md-3">
      {restaurants && restaurants.map((restaurant) => (
        <div className="col mb-4" key={restaurant.id} >
          <RestaurantItem {...restaurant} />
        </div>
      ))}
    </div>
  )
}

export default RestaurantsList