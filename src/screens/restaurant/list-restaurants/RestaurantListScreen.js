import React, { useEffect, useState } from 'react'
import { Section, RestaurantsList, TitleBar } from '../../../components'
import AddressBar from '../../../components/ui/address-bar/AddressBar'
import * as restaurantservie from '../../../services/top-restaurant-service'

function RestaurantListScreen() {
  const [restaurants, setRestaurants] = useState(null);
  
  useEffect(() => {
    restaurantservie.getRestaurants()
      .then(restaurants => setRestaurants(restaurants))
      .catch(error => console.error(error));
  }, [])


  if (!restaurants) {
    return (
      <>
        <AddressBar to="/" address="...loading"/>
        <div className="full-height d-flex justify-content-center align-Categoriess-center ">
        <img src="/assets/icons/loader/loader.svg" alt='loader'  className="m-5"></img>
        </div>
      </>
    );
  }

  return (
    <>
      <div className='mt-5 py-5'>
      <AddressBar to="/" address="Av. Cortes Valencianas 50."/>
        <div className='d-flex flex-row justify-content-center'>
          <Section className={'col-10'} title="Hot Rigth Now!" >
            <RestaurantsList restaurants={restaurants} setRestaurants={setRestaurants}/>
          </Section>
        </div>
        <hr className='mb-5'/>
        <div className='d-flex  flex-row justify-content-center'>
          <Section className={'col-10'} title="Really close to you ;)" >
            <RestaurantsList restaurants={restaurants} setRestaurants={setRestaurants}/>
          </Section>
        </div> 
      </div>
    </>
  )
}

export default RestaurantListScreen