import React from "react";
import { Link } from "react-router-dom";

import "./RestaurantItem.css";

function RestaurantItem({ title, backgroundHero, views, id, name, categories, address, follow}) {
  const condensedViews =
    views >= 1000 ? `${(views / 1000).toFixed(1)}k` : views;

  return (
    <Link to={`/${id}`} className="text-decoration-none">
      <div className="d-flex restaurant-item flex-column ">
        <img className="w-100 rounded-4 img-heigth" src={backgroundHero} alt={title} />
        
        <div className="d-flex mt-3 mb-1 border-bottom justify-content-between align-items-baseline">
          <h3 className="m-0 fs-4 fw-lighter ">{name}</h3>
          <span className="text-muted views text-end w-100 fw-lighter">
            {condensedViews} <i className="fa fa-eye ms-"></i>
          </span>
        </div>

        <div className="d-flex my-1 border-bottom justify-content-start align-items-baseline">
        <i className="fa fa-map-marker fa-fw" aria-hidden="true">&nbsp;</i> <p className="m-0">&nbsp; {address}</p>
        </div>

        <div className="d-flex my-1  border-bottomjustify-content-start align-items-baseline">
        <i className="fa fa-tags fa-fw" aria-hidden="true">&nbsp; </i>
            {categories.map((category) => {
              return(
                <p>&nbsp; {category} &nbsp; </p>
              )
            })}
        </div>
      </div>
    </Link>
  );
}

RestaurantItem.defaultProps = {
  views: 0,
};

export default RestaurantItem;
