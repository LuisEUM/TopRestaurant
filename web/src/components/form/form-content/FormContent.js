import React from "react";
import { motion } from "framer-motion";


const tabContentVariant = {
  active: {
    display: "block",
    transition: {
      staggerChildren: 0.2
    }
  },
  inactive: {
    display: "none"
  }
};

const cardVariant = {
  active: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  },
  inactive: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.5
    }
  }
};



const cards = ["Yosemite", "New York", "Chicago", "Miami"];


function FormContent({ id: tabId, active }) {

  return (
    <motion.div
    role="tabpanel"
    id={tabId}
    className="tab-content"
    variants={tabContentVariant}
    animate={active ? "active" : "inactive"}
    initial="inactive"
  >
    <div className="cards">
      {cards.map((item, index) => (
        <motion.div key={index} variants={cardVariant} className="content-card">
          <div className="info">
            <h3>{`${item}`} - From $800</h3>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
  )
}

export default FormContent