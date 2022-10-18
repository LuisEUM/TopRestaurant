import React, { useState, useEffect } from 'react';
import * as restaurantservice from '../../../services/top-restaurant-service';
import RestaurantItem from '../../../components/restaurants/restaurant-item/RestaurantItem';
import TitleBar from '../../../components/ui/title-bar/TitleBar';
import * as LottiePlayer from "@lottiefiles/lottie-player";
import { Link } from 'react-router-dom';






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
    <>
      {restaurants.length === 0 && 
      <div>
        <div className='d-flex row row-cols-1 g-0 text-center justify-content-center align-items-center align-content-center full-height'>
          <div className='col-10 d-flex justify-content-center align-items-end flex-column  '>
            <div className="row row-cols-1 justify-content-center  row-cols-sm-2 row-cols-md-3">
            <lottie-player autoplay  mode="normal" src="https://assets2.lottiefiles.com/packages/lf20_i1wej2sq.json" style={{"width": "320px"}}/>
              <p className='text-center'>Sorry, but you don't have favorites :( </p>
              <Link to={`/discovery`} className="btn btn-primary col-6 mt-3 text-white">
                Let's find your first love
              </Link>
            </div>
          </div>
        </div>
      </div>

      }
      {restaurants && restaurants.map((follows) => (
        <div className='mt-5 py-5'>
          <div className='d-flex flex-row justify-content-center'>
            <div className={'col-10'} >
              <div className="row row-cols-1 justify-content-center row-cols-sm-2 row-cols-md-3">
              <div className="col mb-4" key={follows.id} >
                <RestaurantItem {...follows.restaurant} />
              </div>
              </div>
            </div>
          </div>
        </div>
        ))}
    </>



  )
}

export default MyFavorites