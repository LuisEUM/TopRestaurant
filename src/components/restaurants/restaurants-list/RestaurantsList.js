import React, { useState, useEffect } from 'react';
import * as restaurantservice from '../../../services/top-restaurant-service';
import RestaurantItem from '../restaurant-item/RestaurantItem';

function RestaurantsList  () {
  const [restaurants, setRestaurants] = useState([]);
  
  useEffect(() => {
    restaurantservice.getRestaurants()
      .then(restaurants => setRestaurants(restaurants))
      .catch(error => console.error(error));
  }, [])

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
      {restaurants.map((restaurant) => (
        <div className="col" key={restaurant.id}>
          <RestaurantItem {...restaurant} />
        </div>
      ))}
    </div>
  )
}

export default RestaurantsList