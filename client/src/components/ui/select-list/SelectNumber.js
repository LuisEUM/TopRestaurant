import "./Select.css";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getZones } from "../../../services/top-restaurant-service";
import { useParams } from "react-router-dom";

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};

function SelectNumber({bookingMaxPersons, selectedNumber, setSelectedNumber}) {
  const [isOpen, setIsOpen] = useState(false);
  const [zones, setZones] = useState(null);
  const {id} = useParams()


  useEffect(()=>{
    getZones(id).then((zones) => {
      setZones(zones);
    });
  }, [id]);

  const persons = [];

  for (let i = 1; i <= bookingMaxPersons; i++){
    persons.push(
        <motion.li
        key={i}
        className="select-list"
          whileHover={{ scale: 1.03, color: "#24549c", borderColor:"#24549c" }}
          whileTap={{ scale: 0.97, color: "#24549c", borderColor:"#24549c" }}
          variants={itemVariants}
          onClick={() => {
            setIsOpen(false);
            setSelectedNumber(i);
          }}
        >
          {i}  
        </motion.li>
      )
  }
  
  
  return (
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className="menu select-list"
      >
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsOpen(!isOpen)}
          className="select-list"
        >
        <p className="fs-6 fw-normal text-secondary m-0">
        {selectedNumber || "Persons"}
        </p>
          <motion.div
            variants={{
              open: { rotate: 180 },
              closed: { rotate: 0 }
            }}
            transition={{ duration: 0.2 }}
            style={{ originY: 0.55 }}
            className="select-list"
          >
            <svg width="15" height="15" viewBox="0 0 20 20" >
              <path d="M0 7 L 20 7 L 10 16" />
            </svg>
          </motion.div>
        </motion.button>
        <motion.ul
          variants={{
            open: {
              clipPath: "inset(0% 0% 0% 0% round 10px)",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.7,
                delayChildren: 0.3,
                staggerChildren: 0.05
              }
            },
            closed: {
              clipPath: "inset(10% 50% 90% 50% round 10px)",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.3
              }
            }
          }}
          className="select-list"
          style={{ pointerEvents: isOpen ? "auto" : "none" }}
        >

        {persons}
  
        </motion.ul>
      </motion.nav>
    );
  }
  
export default SelectNumber