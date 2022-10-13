import React from 'react'
import { Section, RestaurantsList } from '../../components'
import AddressBar from '../../components/ui/address-bar/AddressBar'

function DiscoverScreen() {
  return (
    <div className='mt-5 py-5'>
    <AddressBar to="/" address="Av. Cortes Valencianas 50."/>
      <div className='d-flex flex-row justify-content-center'>
        <Section className={'col-10'} title="Hot Rigth Now!" >
          <RestaurantsList />
        </Section>
      </div>
      <hr className='mb-5'/>
      <div className='d-flex flex-row justify-content-center'>
        <Section className={'col-10'} title="Really close to you ;)" >
          <RestaurantsList />
        </Section>
      </div> 
    </div>
  )
}

export default DiscoverScreen