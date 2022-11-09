import React, { useEffect, useState } from 'react'
import { TitleBar } from '../../../components';
import {BookingItem} from '../../../components';
import { getBookings } from '../../../services/top-restaurant-service';

function MyBookingsList() {
  const [bookings, setBookings] = useState(null);


  useEffect(() => {
    getBookings()
      .then(bookings => setBookings(bookings))
      .catch(error => console.error(error));
  }, [])

  

  if (!bookings) {
    return (
      <>
        <TitleBar to="/accaount" title="Loading..." />
        <div className="full-height d-flex justify-content-center align-items-center ">

        <img src="/assets/icons/loader/loader.svg" alt='loader'  className="m-5"></img>
        </div>
      </>
    );
  }
  return (
    <>
    {bookings && (
      <div className='mt-5 py-5'>
        <div className='d-flex flex-row justify-content-center'>
        <div className={'col-10'} >
          {bookings.map((booking) => (
            <>
            <div className="row row-cols-1 justify-content-center row-cols-sm-2 row-cols-md-3">
                <div className="col mb-4" key={booking.table.zone.restaurant.id} >
                  <BookingItem {...booking.table.zone.restaurant} {...booking} />
                </div>
              </div>
              <hr className='mt-1'/>
            </>
            ))}
          </div>
        </div>
      </div>  
      )}
    </>

  )
}

export default MyBookingsList