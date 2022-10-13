import restaurants from "../../../data/categories.restaurant";
import React, { useState } from "react";
import RestaurantItem from "../restaurant-item/RestaurantItem";
import { Link } from "react-router-dom";

function countryList(restaurants) {
  const categories = restaurants.flatMap((restaurant) => restaurant.categories);
  const filteredStatus = [];

  const uniqueChars = [...new Set(categories)];

  uniqueChars.forEach((element, i) => {
    filteredStatus[i] = {
      name: element,
    };
  });

  return filteredStatus;
}

function RestaurantFilter({ restaurants, setRestaurants}) {
  const [search, setSearch] = useState("All");

  const handleClick = (event) => {
    const { name } = event.currentTarget;
    setSearch(name);
  };


  return (
    <>
    <div className="mb-3">
    <button
        className={`btn border-light me-1  text-secondary mb-1 ${
          search === "All" ? "btn-secondary text-light" : "btn-light text-secondary"
        }`}
        value="All"
        name="All"
        onClick={handleClick}
      >
        All
      </button>
      {countryList(restaurants).map((restaurant, i) => {
        return (
          <Link
            role="button"
            key={restaurant.id}
            className={`btn  border-light mme-1 mb-1 text-secondary ${
              search == restaurant.name ? "btn-secondary text-light" : "btn-light text-secondary"
            }`}
            name={restaurant.name}
            onClick={handleClick}
          >
            {restaurant.name}
          </Link>
        );
      })}
    </div>

      {restaurants
        .filter((restaurants) => {
          if (search === "All") {
            return true;
          } 
          
          return restaurants.categories.reduce((category, next ) => {
            if (category === true) return category; if (category === search || next === search) return true; return false; 
          }, false)
          
        })
        .map((restaurant) => (
          <div className="col mb-4" key={restaurant.id}>
            <RestaurantItem restaurant={restaurant} setRestaurants={setRestaurants} {...restaurant} />
          </div>
        ))}
    </>
  );
}

export default RestaurantFilter;
