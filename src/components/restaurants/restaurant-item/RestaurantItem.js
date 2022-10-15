import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  followRestaurant,
} from "../../../services/top-restaurant-service";

import "./RestaurantItem.css";

function RestaurantItem({restaurant, setRestaurant, backgroundHero, review, id, name, categories, address, follow, logo}) {
const [liked, setLiked] = useState("btn btn-danger follow-heart rounded-circle col-2")



  const handleFollow = () => {
    followRestaurant(id).then((data) => {
      console.log(data)
      const follow = data.follow == 1 ? `btn btn-danger follow-heart rounded-circle col-2 ` : `btn btn-warning follow-heart rounded-circle  col-2`
      setLiked(follow)
      setRestaurant({
        ...restaurant,
        follow: data.folow ? restaurant.follow + 1 : restaurant.follow - 1,
      });
    });
  };

  return (
    <div className=" m-0">
    <Link to={`/restaurants/${id}`} className="text-decoration-none ">
    <div className='col-12 p-2 me-2 d-flex flex-column restaurant-card rounded-4 ' style={{backgroundImage:`url(${backgroundHero })`}}>
    
      <img src={logo} alt='Top Top Square Logo' className='col-3 circle-image-logo shadow' />
    
    <button className={liked} onClick={handleFollow}>
        <i className="fa fa-heart me-2"></i>
        {follow}
    </button>
    
    </div> 

    <div className="d-flex mt-3 mb-1 border-bottom justify-content-between align-items-baseline">
      <h3 className="m-0 fs-4 fw-bold col-9">{name}</h3>
      <span className="text-muted views text-end w-100 fw-lighter">
        {review} <i className="fa fa-star fa-fw text-warning"></i>
      </span>
    </div>


    <div className="d-flex my-1 border-bottom justify-content-start align-items-baseline">
    <i className="fa fa-map-marker fa-fw text-secondary" aria-hidden="true">&nbsp;</i> <p className="m-0">&nbsp; {address}</p>
    </div>

    <div className="d-flex my-1  border-bottom justify-content-start align-items-baseline">
    <i className="fa fa-tags fa-fw text-secondary" aria-hidden="true">&nbsp; </i>
        {categories.map((category) => {
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
