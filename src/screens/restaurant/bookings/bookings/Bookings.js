import React, { useEffect, useState } from 'react'
import DatePicker from 'react-date-picker'
import { useParams } from 'react-router-dom';
import { getRestaurant, getRestaurantSettings } from '../../../../services/top-restaurant-service';
import './Bookings.css'
// import Moment from 'react-moment';
import moment from 'moment';
import { HeroImage, SelectList, TitleBar } from '../../../../components';



function Bookings() {
  const [value, onChange] = useState(new Date());
  const [today, setToday] = useState();
  const [maxMonth, setMaxMonth] = useState();
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);



  useEffect(()=>{
    const d = new Date();
    setToday(d)

    getRestaurantSettings(id).then((settings) => {
      const  settingMaxMonth = (moment().add(settings[0].maximumMonthBookings, 'months')._d)
      setMaxMonth(settingMaxMonth)
    });

    getRestaurant(id).then((restaurant) => {
      console.log(restaurant)
      setRestaurant(restaurant);
    });
  }, [id]);
    
  if (!restaurant) {
    return (
      <>
        <TitleBar to={`/restaurants/${id}`} title="Loading..." />
        <div className="full-height d-flex justify-content-center align-Categoriess-center bg-primary ">
          <p className="text-white">loading...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <TitleBar to={`/restaurants/${id}`} title={`${restaurant.name} - Bookings`} />
      <div className="padding-top-nav mb-5 pb-3">
        <HeroImage
          restaurant={restaurant}
          {...restaurant}
          setRestaurant={setRestaurant}
        ></HeroImage>

      </div>
      <div>
      <div className='d-flex row m-0 justify-content-center text-center '>
        <div className='col-10 d-flex justify-content-center align-items-center flex-column '>
          <p><strong> Welcome to {restaurant.name}!</strong> <br/> Do you want a date with us, rigth? 😉 <br/>  Follow the next steps and we will meet us soon 🎉!  </p>

          <div class="circle-around fs-6 p-0 d-flex justify-content-center align-items-center align-content-center border-primary bg-primary mt-3">
            <p className='m-0 text-white'>1</p>
          </div>
          <p>Pick your favorite date:</p>
          <DatePicker className={'rounded d-flex justify-content-center align-items-center '} onChange={onChange} value={value} calendarIcon={<i className="fa fa-calendar fa-fw "/>} clearIcon={<i className="fa fa-close fa-fw text-secondary "/>}   minDate={today} maxDate={maxMonth}  closeCalendar={false} />
        </div>


        <div className='col-10 d-flex justify-content-center align-items-center flex-column mt-5 mt-3'>
        <div class="circle-around fs-6 p-0 d-flex justify-content-center align-items-center align-content-center border-primary bg-primary mt-3">
            <p className='m-0 text-white'>2</p>
        </div>
        <p>Wich zone do you prefer?</p>
        <SelectList id={id}/>
        </div>
      </div>
      
    </div>
  </>


    )
}

export default Bookings