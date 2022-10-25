import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { BookingContext } from "../../../contexts/BookingContextProvider";
import dataHours from '../../../data/time.slot.json'
import './secondStep.css'
import toast, { Toaster } from 'react-hot-toast';
import { postBooking } from "../../../services/top-restaurant-service";

const tabContentVariant = {
  active: {
    display: "block",
    transition: {
      staggerChildren: 0.2
    }
  },
  inactive: {
    display: "none"
  }
};

const cardVariant = {
  active: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  },
  inactive: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.5
    }
  }
};

function SecondStep({ id: tabId, active }) {
  const [activeHourButton, setActvieHourButton] = useState(false);
  const  {id, stepOneData, setStepOneData, setActiveTabIndex, setStepTwoData}  = useContext(BookingContext);

  const handleClick = (event)=>{
    const { name } = event.currentTarget;
    console.log(activeHourButton, dataHours, name)

    setActvieHourButton(name)
  }

  const goToStepThree = () => {
    stepOneData.hour = parseInt(activeHourButton)
    delete stepOneData.availableHours
    console.log(stepOneData)

    toast.promise(    
      postBooking(id,stepOneData)
        .then((booking) => {
          setActiveTabIndex(2)
          setStepTwoData(booking.id)
        })
        .then(() => {
          setStepOneData(false)
        })
      .catch(error => console.error(error)), {
      loading: 'Loading',
      success: 'Booking created',
      error: 'Error creating Booking',
    });
  }
  
    if(stepOneData){
      return (
        <>
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
        <motion.div
        role="tabpanel"
        id={tabId}
        className="tab-content d-flex justify-content-center align-content-center"
        variants={tabContentVariant}
        animate={active ? "active" : "inactive"}
        initial="inactive"
        >
            <motion.div variants={cardVariant} className='d-flex justify-content-center align-content-center flex-wrap col-10 mt-3  '>
              {stepOneData.availableHours && stepOneData.availableHours.map((hour)=>(
                  <motion.div variants={cardVariant}>
                    <button key={hour} name={hour} onClick={handleClick} value={activeHourButton} className={activeHourButton == hour  ? `m-2 bg-secondary rounded-1 border-0 active-button text-white` : `m-2 bg-white rounded-1 no-active-button` } > {dataHours[hour]}</button>
                  </motion.div>
                ))}
            </motion.div>
  
            {activeHourButton &&  
              <motion.div variants={cardVariant} className="d-flex justify-content-end align-items-center mt-5">
                <button className={`btn btn-primary ${activeHourButton ? "" : "disabled"}`} onClick={goToStepThree}> Next</button>
              </motion.div>
            }
          </motion.div>
        </>
      )
    }


}

export default SecondStep