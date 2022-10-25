import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getRestaurant } from '../../../../services/top-restaurant-service';
import './Bookings.css'
// import Moment from 'react-moment';
import { HeroImage, StepFormComponent, TitleBar } from '../../../../components';
import tabs from "../../../../components/form/tabs/steps.form";
import BookingContextProvider from "../../../../contexts/BookingContextProvider.js";


function Bookings() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(()=>{

    getRestaurant(id).then((restaurant) => {
      setRestaurant(restaurant);
    });

  }, [id]);

  if (!restaurant) {
    return (
      <>
        <TitleBar to={`/restaurants/${id}`} title="Loading..." />
        <div className="full-height d-flex justify-content-center align-items-center ">
        <img src="/assets/icons/loader/loader.svg" alt='loader'  className="m-5"></img>
        </div>
      </>
    );
  }

  return (
    <>
    <TitleBar to={`/restaurants/${id}`} title={'Menu'} />
    <div className="padding-top-nav mb-5 pb-3">
      <HeroImage
        restaurant={restaurant}
        {...restaurant}
        setRestaurant={setRestaurant}
      ></HeroImage>
    </div>
    <div className='container'>
      <BookingContextProvider >
        <StepFormComponent tabs={tabs}  />
      </BookingContextProvider>
      </div>

    </>

  )
  

  // if (false) return (
  //   <>
  //     <TitleBar to={`/restaurants/${id}`} title={`${restaurant.name} - Bookings`} />
  //     <div className="padding-top-nav mb-5 pb-3">
  //       <HeroImage
  //         restaurant={restaurant}
  //         {...restaurant}
  //         setRestaurant={setRestaurant}
  //       ></HeroImage>

  //     </div>
  //     <div>
  //     <div className='d-flex row m-0 justify-content-center text-center '>
  //       <div className='col-10 d-flex justify-content-center align-items-center flex-column '>

  //         <p><strong> Welcome to {restaurant.name}!</strong> <br/> Do you want a date with us, rigth? 😉 <br/>  Follow the next steps and we will meet us soon 🎉!  </p>

  //         <div class="circle-around fs-6 p-0 d-flex justify-content-center align-items-center align-content-center border-primary bg-primary mt-3">
  //           <p className='m-0 text-white'>1</p>
  //         </div>
  //         <p>Pick your favorite date:</p>
  //         <DatePicker className={'rounded d-flex justify-content-center align-items-center '} onChange={onChange} value={requestedDate} calendarIcon={<i className="fa fa-calendar fa-fw "/>} clearIcon={<i className="fa fa-close fa-fw text-secondary "/>}   minDate={today} maxDate={maxMonth}  closeCalendar={false} />
  //       </div>


  //       <div className='col-10 d-flex justify-content-center align-items-center flex-column mt-5 mt-3'>
  //         <div class="circle-around fs-6 p-0 d-flex justify-content-center align-items-center align-content-center border-primary bg-primary mt-3">
  //             <p className='m-0 text-white'>2</p>
  //         </div>
  //         <p>Wich zone do you prefer?</p>
  //         <SelectList id={id} style={{zIndex:'100'}}/>
  //       </div>

  //       <div className='col-10 d-flex justify-content-center align-items-center flex-column mt-5 mt-3 '>
  //         <div class="circle-around fs-6 p-0 d-flex justify-content-center align-items-center align-content-center border-primary bg-primary mt-3">
  //             <p className='m-0 text-white'>3</p>
  //         </div>
  //         <p>How big is your group?</p>
  //         <SelectNumber id={id} {...restaurantSettings} />
  //       </div>

  //       {availableHours && (
  //         <div className='d-flex  justify-content-center align-content-center flex-wrap col-10 mt-3  '>
  //           {availableHours}
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // </>
  //   )
}

export default Bookings