import React, { useState, useEffect } from 'react';
import * as restaurantservice from '../../../services/top-restaurant-service';
import RestaurantItem from '../../../components/restaurants/restaurant-item/RestaurantItem';
import TitleBar from '../../../components/ui/title-bar/TitleBar';

function  MyFavorites() {
  const [restaurants, setRestaurants] = useState(null);
  
  useEffect(() => {
    restaurantservice.getFavorites()
      .then(restaurants => setRestaurants(restaurants))
      .catch(error => console.error(error));
  }, [])

  if (!restaurants) {
    return (
      <>
        <TitleBar to="/accaount" title="Loading..." />
        <div className="full-height d-flex justify-content-center align-items-center bg-primary ">
          <p className="text-white">loading...</p>
        </div>
      </>
    );
  }

  return (
    <div className='mt-5 py-5'>
      <div className='d-flex flex-row justify-content-center'>
        <div className={'col-10'} >
          <div className="row row-cols-1 justify-content-center row-cols-sm-2 row-cols-md-3">
            {restaurants && restaurants.map((follows) => (
              <div className="col mb-4" key={follows.restaurant.id} >
                <RestaurantItem {...follows.restaurant} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyFavorites