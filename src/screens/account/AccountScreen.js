import React from 'react'
import InfoAccount from '../../components/account/info-account/InfoAccount'
import NavAccount from '../../components/account/nav-account/NavAccount'
import AddressBar from '../../components/ui/address-bar/AddressBar'

function AccountScreen() {
  return (
    <>
      <AddressBar  address="Av. Cortes Valencianas 50. " to="/" />
      <InfoAccount/>
      <NavAccount/>
      <p className='text-center pt-5'>Proyecto desarrollado por @LuisEUM</p>
    </>
  )
}




export default AccountScreen