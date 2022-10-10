import React from "react";
import { Link } from "react-router-dom";

import "./RestaurantItem.css";

function RestaurantItem({ title, backgroundHero, views, id, name, types, address, follow}) {
  const condensedViews =
    views >= 1000 ? `${(views / 1000).toFixed(1)}k` : views;

  return (
    <Link to={`/${id}`}>
      <div className="d-flex restaurant-item flex-column">
        <img className="w-100 rounded-1" src={backgroundHero} alt={title} />
        <div className="d-flex mt-1 justify-content-between align-items-baseline">
          <h3 className="m-0 fs-4 fw-lighter">{name}</h3>
          <span className="text-muted views text-end w-100 fw-lighter">
            {condensedViews} <i className="fa fa-eye ms-"></i>
          </span>
        </div>
      </div>
    </Link>
  );
}

RestaurantItem.defaultProps = {
  views: 0,
};

export default RestaurantItem;
