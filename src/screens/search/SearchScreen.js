import React, { useEffect, useState } from 'react'
import { Section } from '../../components'
import RestaurantFilter from '../../components/restaurants/restaurant-filter/RestaurantFilter'
import SearchBar from '../../components/restaurants/restaurant-search-bar/RestaurantSearchBar'
import AddressBar from '../../components/ui/address-bar/AddressBar'
import * as restaurantservice from "../../services/top-restaurant-service";

function SearchScreen() {
  const [restaurants, setRestaurants] = useState([]);


  useEffect(() => {
    restaurantservice
      .getRestaurants()
      .then((restaurants) => setRestaurants(restaurants))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className='d-flex flex-row justify-content-center align-items-baseline  mt-5 py-5 '>
    <Section className={'col-10'} title="Categories:" >
      <AddressBar to="/" address="Av. Cortes Valencianas 50."/>
        <SearchBar  restaurants={restaurants} setRestaurants={setRestaurants}/>
        <RestaurantFilter restaurants={restaurants} setRestaurants={setRestaurants}/>
    </Section>
  </div>
  )
}

export default SearchScreen