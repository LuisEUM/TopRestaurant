import React, { useState } from "react";
import { Link } from "react-router-dom";

import Heart from "../../ui/heart/Heart";

import "./RestaurantItem.css";

function RestaurantItem({restaurant, setRestaurant, backgroundHero, review, id, name, categories, address, follow, logo}) {

const avergare = (review) =>{
  return review.reduce((avg, value, _, {
      length
    }) => {
      return avg + (value.rate / length);
    }, 0);

} 



  return (
    <div className=" m-0">
    <div className="position-relative">
      <Link to={`/restaurants/${id}`} className='col-12 p-2 d-flex flex-column restaurant-card rounded-4 position-relative p-2' style={{zIndex:0, backgroundImage:`url(${backgroundHero}) `}}>
      </Link>

      <div  className='col-12 p-2 d-flex flex-column rounded-4 restaurant-card-2 p-2 position-absolute '>
        <div className="position-relative ">
            <Heart className="position-absolute end-0 d-flex col-10" id={id} style={{zIndex:100}}/>
            <img src={logo} alt='Top Top Square Logo' className=' col-3 circle-image-logo shadow position-absolute top-0' />
        </div>
            
      </div>
    </div>



    <Link to={`/restaurants/${id}`} className="text-decoration-none">
    <div className="d-flex mt-3 mb-1 border-bottom justify-content-between align-items-baseline ">

      <h3 className="m-0 fs-4 fw-bold col-9">{name}</h3>
      <span className="text-muted views text-end w-100 fw-lighter">
        {review && <p className="m-0">{avergare(review)} <i className="fa fa-star fa-fw text-warning"></i> </p>
        } 
      </span>
      </div>


      <div className="d-flex my-1 border-bottom justify-content-start align-items-baseline">
      <i className="fa fa-map-marker fa-fw text-secondary" aria-hidden="true">&nbsp;</i> <p className="m-0">&nbsp; {address}</p>
      </div>

      <div className="d-flex my-1  border-bottom justify-content-start align-items-baseline">
      <i className="fa fa-tags fa-fw text-secondary" aria-hidden="true">&nbsp; </i>
        {categories && categories.map((category) => {
          return(
            <p>&nbsp; {category} &nbsp; </p>
          )
        })}
      </div>
    </Link>
    

    </div>
    
  );
}

RestaurantItem.defaultProps = {
  views: 0,
};

export default RestaurantItem;
