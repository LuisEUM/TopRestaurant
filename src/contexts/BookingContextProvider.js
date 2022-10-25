import { createContext, useState, useEffect } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import {  getRestaurantSettings } from "../services/top-restaurant-service";

export const BookingContext = createContext();

function BookingContextProvider({ children }) {

  const [maxMonth, setMaxMonth] = useState();
  const { id } = useParams();
  const [restaurantSettings, setRestaurantSettings] = useState(null);
  const [today, setToday] = useState();
  const [stepOne, setStepOne] = useState(false);
  const [stepOneData, setStepOneData] = useState(false);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(2);

  // const handleBookingCreated = (task) => {
  //   setBooking((bokingData) => {
  //     return [
  //       ...tasks,
  //       bokingData
  //     ]
  //   })
  // }

  useEffect(()=>{
    const d = new Date();
    setToday(d)

    getRestaurantSettings(id)
    .then((settings) => {
      const  settingMaxMonth = (moment().add(settings.maximumMonthBookings, 'months')._d)
      setMaxMonth(settingMaxMonth)
      setRestaurantSettings(settings)
    })
    .catch((error) => console.log(error))


    .catch((error) => console.log(error))

  }, [id]);

  const Booking = {
    maxMonth,
    setMaxMonth,
    id,
    restaurantSettings,
    setRestaurantSettings,
    today,
    setToday,
    stepOne,
    setStepOne,
    stepOneData,
    setStepOneData,
    stepTwo,
    setStepTwo,
    stepThree,
    setStepThree,
    activeTabIndex,
    setActiveTabIndex
  };

  return <BookingContext.Provider value={Booking}>{children}</BookingContext.Provider>;
}

export default BookingContextProvider;