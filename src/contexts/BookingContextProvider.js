import { createContext, useState, useEffect } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { getRestaurant, getRestaurantSettings } from "../services/top-restaurant-service";

export const BookingContext = createContext();

function BookingContextProvider({ children }) {
  const [maxMonth, setMaxMonth] = useState();
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [restaurantSettings, setRestaurantSettings] = useState(null);
  const [today, setToday] = useState();


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

    getRestaurant(id).then((restaurant) => {
      setRestaurant(restaurant);
    })
    .catch((error) => console.log(error))

  }, [id]);

  const Booking = {
    maxMonth,
    setMaxMonth,
    id,
    restaurant,
    setRestaurant,
    restaurantSettings,
    setRestaurantSettings,
    today,
    setToday
  };

  console.log(Booking)
  return <BookingContext.Provider value={Booking}>{children}</BookingContext.Provider>;
}

export default BookingContextProvider;