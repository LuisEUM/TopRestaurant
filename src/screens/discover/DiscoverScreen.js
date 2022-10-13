
import React from 'react'
import { Section, RestaurantsList } from '../../components'
import AddressBar from '../../components/ui/address-bar/AddressBar'

function DiscoverScreen() {
  return (
    <>
    <AddressBar to="/" address="Av. Cortes Valencianas 50."/>
    <div className='mt-5 pt-5'>
      <p>FILTER</p>
    </div>
    <div>
      <p>CATEGORIES</p>
    </div>
    <div>
      <div className='d-flex flex-row justify-content-center'>
        <Section className={'col-10'} title="Hot Rigth Now!" >
          <RestaurantsList />
        </Section>
      </div>
      <hr className='my-5'/>
      <div className='d-flex flex-row justify-content-center'>
        <Section className={'col-10'} title="Really close to you ;)" icon="none">
          <RestaurantsList />
        </Section>
      </div> 
    </div>
    </>
  )
}

export default DiscoverScreen