import React from 'react'
import { TitleBar } from '../../../components'
import {MyBookingsList} from '../../index'

function MyBookingsScreen() {
  return (
    <>
      <TitleBar to="/account" title="My Bookings" />
      <MyBookingsList/>
    </>
  )
}

export default MyBookingsScreen