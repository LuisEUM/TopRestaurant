import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HeroImage, TitleBar } from "../../../components";
import { getRestaurant } from "../../../services/top-restaurant-service";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import "./menu.css";
//Menu interface
function Menu() {
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState(null);
  const { id } = useParams();

  console.log(restaurant);
  useEffect(() => {
    getRestaurant(id).then((restaurant) => {
      setRestaurant(restaurant);
      setMenu(restaurant.menus);
    });
  }, [id]);

  if (!restaurant) {
    return (
      <>
        <TitleBar to="/discovery" title="Loading..." />
        <div className="full-height d-flex justify-content-center align-Categoriess-center bg-primary ">
          <p className="text-white">loading...</p>
        </div>
      </>
    );
  }
  return (
    <>
      <TitleBar to={`/restaurants/${id}`} title={restaurant.name} />

      <div className="padding-top-nav mb-5 pb-3">
        <HeroImage
          restaurant={restaurant}
          {...restaurant}
          setRestaurant={setRestaurant}
        ></HeroImage>
      </div>

      <AnimateSharedLayout className="d-flex row m-0 justify-content-center text-center py-5 ">
        <motion.ul
          layout
          initial={{ borderRadius: 25 }}
          className="col-12 mt-5 mb-5 category-box"
        >
          {menu &&
            menu.map((categories) => (
                <Link to={`/products/${categories.id}`} className="text-decoration-none">
                    <Categories key={categories.id} {...categories} className="mb-3"/>
                </Link>
            ))}
        </motion.ul>
      </AnimateSharedLayout>
    </>
  );
}

//Menus
function Categories({ name, coverImage, description, className}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <>
      <motion.li
        className={`category-box d-flex row ${className}`}
        layout
        onClick={toggleOpen}
        initial={{ borderRadius: 10 }}
      >
        <motion.div
          className="avatar col-3"
          layout
          style={{ backgroundImage: `url(${coverImage}) ` }}
        />
        <div className="col-9 text-center align-items-center d-flex justify-content-center">
          <p className="m-0">
            <strong>{name}</strong>
            <br /> {description}
          </p>
        </div>
        {/* <AnimatePresence>{isOpen && <Content description={description} />}</AnimatePresence> */}
      </motion.li>
    </>
  );
}

// //menu contente
// function Content({description}) {
//     return (
//       <motion.div
//         layout
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//       >
//         <div className='bg-danger w-100 col-12 menu-mh-80'>
//             <p>{description}</p>
//         </div>

//       </motion.div>
//     );
//   }

export default Menu;
