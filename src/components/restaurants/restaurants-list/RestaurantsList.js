import React from 'react';
import RestaurantItem from '../restaurant-item/RestaurantItem';

function  RestaurantsList  ({restaurants, setRestaurants}) {


  return (
    <div className="row row-cols-1 justify-content-center row-cols-sm-2 row-cols-md-3">
      {restaurants ? restaurants.map((restaurant) => (
        <div className="col mb-4" key={restaurant.id} >
          <RestaurantItem {...restaurant} />
        </div>
      )) :
      <div className="full-height d-flex justify-content-center align-items-center">
        <img src="/assets/icons/loader/loader.svg" alt='loader'  className="m-5"></img>
        </div>
      }
    </div>
  )
}

export default RestaurantsList