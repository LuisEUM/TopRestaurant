import React, { useState, useEffect, useContext } from "react";
import cn from "classnames";
import { motion } from "framer-motion";
import "./StepFormComponent.css";
import { BookingContext } from "../../../contexts/BookingContextProvider";

const tabVariant = {
  active: {
    width: "55%",
    transition: {
      type: "tween",
      duration: 0.4
    }
  },
  inactive: {
    width: "15%",
    transition: {
      type: "tween",
      duration: 0.4
    }
  }
};

const tabTextVariant = {
  active: {
    opacity: 1,
    x: 0,
    display: "block",
    transition: {
      type: "tween",
      duration: 0.3,
      delay: 0.3
    }
  },
  inactive: {
    opacity: 0,
    x: -30,
    transition: {
      type: "tween",
      duration: 0.3,
      delay: 0.1
    },
    transitionEnd: { display: "none" }
  }
};

const StepFormComponent = ({ tabs, defaultIndex = 0 }) => {
  const  {activeTabIndex, setActiveTabIndex}  = useContext(BookingContext);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--active-color",
      tabs[activeTabIndex].color
    );
  }, [activeTabIndex, tabs]);

  // Default to a tab based on the URL hash value
  useEffect(() => {
    const tabFromHash = tabs.findIndex(
      (tab) => `#${tab.id}` === window.location.hash
    );
    setActiveTabIndex(tabFromHash !== -1 ? tabFromHash : defaultIndex);
  }, [tabs, setActiveTabIndex, defaultIndex]);


  return (
    <div className="d-flex row justify-content-center align-items-center mb-5 pb-5">
    <div className="tabs-component col-10">
      <ul className="tab-links" role="tablist">
        {tabs.map((tab, index) => (
          <motion.li
            key={tab.id}
            className={cn("tab", { active: activeTabIndex === index })}
            role="presentation"
            variants={tabVariant}
            animate={activeTabIndex === index ? "active" : "inactive"}
          >
            <a href={`#${tab.id}`}>
              {tab.icon}
              <motion.span variants={tabTextVariant}>{tab.title}</motion.span>
            </a>
          </motion.li>
        ))}

      </ul>
      {tabs.map((tab, index) => (
        <tab.content
          key={tab.id}
          id={`${tab.id}-content`}
          active={activeTabIndex === index}
        />
      ))}


    </div>
  </div>
  )
}

export default StepFormComponent