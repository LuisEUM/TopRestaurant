import React, { useEffect, useState } from 'react'
import { Section, TitleBar } from '../../components'
import RestaurantFilter from '../../components/restaurants/restaurant-filter/RestaurantFilter'
import SearchBar from '../../components/restaurants/restaurant-search-bar/RestaurantSearchBar'
import AddressBar from '../../components/ui/address-bar/AddressBar'
import * as restaurantservice from "../../services/top-restaurant-service";

function SearchScreen() {
  const [restaurants, setRestaurants] = useState(null);


  useEffect(() => {
    restaurantservice
      .getRestaurants()
      .then((restaurants) => setRestaurants(restaurants))
      .catch((error) => console.error(error));
  }, []);

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
      <AddressBar to="/" address="Av. Cortes Valencianas 50."/>
        <div className='d-flex flex-row justify-content-center'>
          <div className='col-10 '>
            <SearchBar  restaurants={restaurants} setRestaurants={setRestaurants}/>
          </div>
        </div>
        <div className='d-flex flex-row justify-content-center mt-3'>
            <Section className={'col-10'} title="Categories:" >
                <AddressBar to="/" address="Av. Cortes Valencianas 50."/>
                <RestaurantFilter restaurants={restaurants} setRestaurants={setRestaurants}/>
            </Section>   
      </div> 
    </div>
  )
}

export default SearchScreen

