import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./BookingItem.css";
import dataHour from "../../../data/time.slot.json"
import { useEffect } from "react";


function BookingItem({backgroundHero, review, id, name, categories, address, startDate, hours, persons, status}) {
const [statusColor, setStatusColor] = useState("secondary")

useEffect(()=>{
  if(status === "Pending"){
    setStatusColor("warning")
  } else if(status === "Canceled"){
    setStatusColor("danger")
  } else if(status === "Completed"){
    setStatusColor("success")
  }
},[status])

const avergare = (review) =>{
  return review.reduce((avg, value, _, {
      length
    }) => {
      return avg + (value.rate / length);
    }, 0);

} 



  return (
  <div className=" m-0">
  <Link to={`/restaurants/${id}`}  className="text-decoration-none d-flex">
    <div to={`/restaurants/${id}`} className='col-4 p-2 d-flex flex-column booking-card rounded-4 position-relative p-2' style={{backgroundImage:`url(${backgroundHero}) `}}/>
    
    <div className="p-3 col-7 justify-content-center align-items-center align-content-center">
      <div className="d-flex    mb-1 border-bottom justify-content-between align-items-baseline ">
        <h3 className="m-0 fs-6 fw-bold col-9">{name}</h3>
        <span className="text-muted views text-end w-100 fw-lighter">
          {review && <p className="m-0 fs-8">{avergare(review)} <i className="fa fa-star fa-fw text-warning"></i> </p>
          } 
        </span>
      </div>


      <div className="d-flex my-1 border-bottom justify-content-start align-items-baseline">
        <i className="fa fa-map-marker fa-fw text-secondary fs-8" aria-hidden="true">&nbsp;</i> <p className="m-0 fs-8">&nbsp; {address}</p>
      </div>

      <div className="d-flex my-1  border-bottom justify-content-start align-items-baseline ">
      <i className={`fa fa-circle fa-fw text-secondary fs-8 text-${statusColor}`} aria-hidden="true">&nbsp; </i>
        <p className="fs-8 m-0">&nbsp; {status} &nbsp; </p>
      </div>
    </div>

    <div className="col-1 d-flex align-items-center">
        <i className="fa fa-chevron-right d-flex align-items-center align-self-center text-secondary" />
    </div>

  </Link>

        <div className="d-flex justify-content-center align-items-center  ">
          <div className={`btn btn-light border-secondary fs-8 rounded-0 rounded-left-date col-4 fw-bold p-1`} > {new Date(startDate).toDateString()}</div>
          <div className={`btn btn-light border-secondary fs-8 rounded-0 col-4 fw-bold  p-1`} > {dataHour[hours[0]]}</div>
          <div className={`btn btn-light border-secondary fs-8 rounded-0  rounded-right-date col-4 fw-bold  p-1`} > {persons} Pers.</div>
        </div>

    </div>
    
  );
}

BookingItem.defaultProps = {
  views: 0,
};

export default BookingItem;
