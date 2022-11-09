import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { HeroImage, TitleBar } from '../../../../components'
import { getMenu } from '../../../../services/top-restaurant-service';
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";

const Products = () => {
  const [menu, setMenu] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getMenu(id).then((menu) => {
      setMenu(menu);
    });
  }, [id]);

  if (!menu) {
    return (
      <>
        <TitleBar to="/discovery" title="Loading..." />
        <div className="full-height d-flex justify-content-center align-Categoriess-center ">
        <img src="/assets/icons/loader/loader.svg" alt='loader'  className="m-5"></img>
        </div>
      </>
    );
  }

  return (
    <>
      <TitleBar to={`/menu/${menu.restaurant}`} title={menu.name} />

      <div className="padding-top-nav">
        { <HeroImage
          menu={menu}
          setMenu={setMenu}
        ></HeroImage> }
      </div>

      <AnimateSharedLayout className="d-flex row m-0 justify-content-center text-center py-5 ">
        <motion.ul
          layout
          initial={{ borderRadius: 25 }}
          className="col-12 mb-4 category-box"
        >
          {menu.products &&
            menu.products.map((categories) => (

              <Categories key={categories.id} {...categories} className="mb-3"/>

            ))}
        </motion.ul>
      </AnimateSharedLayout>
    </>
  )
}

//Menus
function Categories({ name, image, description, className, price}) {

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
          style={{ backgroundImage: `url(${image}) ` }}
        />
        <div className="col-9 text-center align-items-center d-flex justify-content-center">
          <p className="m-0">
            <strong>{name}</strong> - {price}€
          </p>
        </div>

        <AnimatePresence>{isOpen && <Content description={description}/>}</AnimatePresence>
        {/* <AnimatePresence>{isOpen && <Content description={description} />}</AnimatePresence> */}
      </motion.li>
    </>
  );
}

function Content({description}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}

      className="text-center mt-4"
    >

      <div>
        <p>{description}</p>
      </div>

    </motion.div>
  );
}

export default Products