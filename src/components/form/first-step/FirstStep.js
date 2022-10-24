import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import DatePicker from "react-date-picker";
import SelectList from "../../ui/select-list/SelectList";
import SelectNumber from "../../ui/select-list/SelectNumber";
import TitleBar from "../../ui/title-bar/TitleBar";
import { BookingContext } from "../../../contexts/BookingContextProvider";
import { getAvailableHours } from "../../../services/top-restaurant-service";

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



function FormContent({ id : newId, active }) {
  const [requestedDate, onChange] = useState(new Date());
  const  {id, today,  maxMonth,  restaurantSettings, stepOne, setStepOne, setActiveTabIndex,  setStepOneData}  = useContext(BookingContext);
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(null);


  if (!restaurantSettings) {
    return (
      <>
        <TitleBar to={`/restaurants/${id}`} title="Loading..." />
        <div className="height-200 d-flex justify-content-center align-items-center ">
          <img src="/assets/icons/loader/loader.svg" alt='loader'  className="m-5" ></img>
        </div>
      </>
    );
  }

if(requestedDate && selectedZone && selectedNumber) {
  setStepOne(true)
} 

if (!requestedDate || !selectedZone || !selectedNumber ){
  setStepOne(false)
}


const goToStepTwo = () => {

  getAvailableHours(id)
  .then((availableHours) => {

    if(availableHours === []){
      console.error('EMPTY')
    } else {
      const  data = {
        ...availableHours,
        requestedDate,
        selectedZone,
        selectedNumber
      }
      setStepOneData(data)
      setActiveTabIndex(1)
    }
  })
  .catch(error => console.error(error))
}

return(
  <>
<motion.div
  role="tabpanel"
  id={newId}
  className="tab-content"
  variants={tabContentVariant}
  animate={active ? "active" : "inactive"}
  initial="inactive"
  >
      <motion.div>
      <div  className='d-flex row m-0 justify-content-center text-center '>

        <motion.div   variants={cardVariant} className='col-10 d-flex justify-content-center align-items-center flex-column' >
          <p><strong> Welcome! </strong> <br/> Do you want a date with us, rigth? 😉 <br/>  Follow the next steps and we will meet us soon 🎉!  </p>
        </motion.div>

        <motion.div  variants={cardVariant} className='col-10 d-flex justify-content-center align-items-center flex-column' >
          <div class="circle-around fs-6 p-0 d-flex justify-content-center align-items-center align-content-center border-primary bg-primary mt-3">
            <p className='m-0 text-white'>1</p>
          </div>
          <p>Pick your favorite date:</p>
          <DatePicker className={'rounded d-flex justify-content-center align-items-center '} onChange={onChange} value={requestedDate} calendarIcon={<i className="fa fa-calendar fa-fw "/>} clearIcon={<i className="fa fa-close fa-fw text-secondary "/>}   minDate={today} maxDate={maxMonth}  closeCalendar={false} />
        </motion.div>


        <motion.div  variants={cardVariant} className='col-10 d-flex justify-content-center align-items-center flex-column mt-5 mt-3'>
          <div class="circle-around fs-6 p-0 d-flex justify-content-center align-items-center align-content-center border-primary bg-primary mt-3">
              <p className='m-0 text-white'>2</p>
          </div>
          <p>Wich zone do you prefer?</p>
          <SelectList selectedZone={selectedZone} setSelectedZone={setSelectedZone} id={id} style={{zIndex:'100'}}/>
        </motion.div>

        <motion.div variants={cardVariant} className='col-10 d-flex justify-content-center align-items-center flex-column mt-5 mt-3 '>
          <div class="circle-around fs-6 p-0 d-flex justify-content-center align-items-center align-content-center border-primary bg-primary mt-3">
              <p className='m-0 text-white'>3</p>
          </div>
          <p>How big is your group?</p>
          <SelectNumber  selectedNumber={selectedNumber} setSelectedNumber={setSelectedNumber} id={id} {...restaurantSettings} />
        </motion.div>
      {stepOne &&  
        <motion.div variants={cardVariant} className="d-flex justify-content-end align-items-center mt-5">
          <button className={`btn btn-primary ${stepOne ? "" : "disabled"}`} onClick={goToStepTwo}> Next</button>
        </motion.div>
      }
      </div>
    </motion.div>
</motion.div>

</>

)
}

export default FormContent