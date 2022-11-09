// import restaurants from "../../../data/categories.restaurant";
import React, { useEffect, useRef, useState } from "react";
import RestaurantItem from "../restaurant-item/RestaurantItem";
import dataCategory from "../../../data/categories.restaurant";
import "./RestaurantFilter.css";
import { motion, useDragControls, useMotionValue, useTransform } from "framer-motion";
import Section from "../../section/Section";

// function categoryList(restaurants) {
// const categories = restaurants.flatMap((restaurant) => restaurant.categories);
// const filteredStatus = [];
// const uniqueChars = [...new Set(categories)];
// uniqueChars.forEach((element, i) => {
//   filteredStatus[i] = {
//     name: element,
//   };
// });
//   return dataCategory;
// }

function RestaurantFilter({ restaurants, setRestaurants }) {
  const [search, setSearch] = useState("All");
  const controls = useDragControls();
  const handleX = useMotionValue(0);
  const progressScaleX = useTransform(handleX, [0, 300], [0, 1]);
  const [categoriesWidth, setCategoriesWidth] = useState("All");
  const constraintsRef = useRef(null);


  useEffect(()=>{
    const categoriesDiv = document.getElementById('categories');
    setCategoriesWidth(categoriesDiv.offsetWidth)
  
  },[])

  const handleClick = (event) => {
    const { name } = event.currentTarget;
    setSearch(name);
  };

  function startDrag(event) {
    controls.start(event);
  }



  return (
    <>
      <div
        onPointerDown={startDrag}
        style={{ scaleX: progressScaleX }}
        ref={constraintsRef}
        className="mb-3  d-flex justify-content-start align-items-center text-center category-height overflow-hidden py-1"
      >

        <motion.div
          dragPropagation
          drag="x"
          dragConstraints={constraintsRef}
          dragControls={controls}
          dragElastic={0.08}
          style={{ x: handleX }}
          id="categories"
          className="mb-3  container-f-h d-flex col justify-content-start align-items-center text-center "
          onDragEnd={(event, info) => {
            if (info.offset.x > categoriesWidth){
              alert('yes')
            }
          }}
        >
          <button
            className={`btn border-light me-1  mb-1 ${
              search === "All"
                ? "btn-secondary text-white"
                : "btn-light text-secondary"
            }`}
            value="All"
            name="All"
            onClick={handleClick}
          >
            All
          </button>

          {restaurants &&
            dataCategory.map((category, i) => {
              return (
                <button
                  key={category.id}
                  className={`btn row border-light  mb-1  mx-2 w-25 ${
                    search === category.name
                      ? "btn-secondary text-white"
                      : "btn-light text-secondary"
                  }`}
                  name={category.name}
                  onClick={handleClick}
                >
                  <div className="col w-100">
                    <div>
                      <img
                        src={category.src}
                        alt={category.name}
                        className="category-icon"
                      />
                    </div>

                    <div className="">
                      <p className={`m-0 font-tiny ${search === category.name
                      ? "btn-secondary text-white"
                      : "btn-light text-secondary"}`}>{category.name}</p>
                    </div>
                  </div>
                </button>
              );
            })}
        </motion.div>
      </div>
      <Section className='results' title="Results:" >
      {restaurants &&
        restaurants
          .filter((restaurants) => {
            if (search === "All") {
              return true;
            }

            return restaurants.categories.reduce((category, next) => {
              if (category === true) return category;
              if (category === search || next === search) return true;
              return false;
            }, false);
          })
          .map((restaurant) => (
            <div className="col mb-4" key={restaurant.id}>
              <RestaurantItem
                restaurant={restaurant}
                setRestaurants={setRestaurants}
                {...restaurant}
              />
            </div>
          ))}
      </Section>
    </>
    
  );
}

export default RestaurantFilter;
