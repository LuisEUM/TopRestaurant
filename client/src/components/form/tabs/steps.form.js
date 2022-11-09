import React from "react";
import FirstStep from "../first-step/FirstStep";
import SecondStep from "../second-step/SecondStep";
import ThirdStep from "../third-step/ThirdStep";

// Configure our tabs and tab content here
const tabs = [
  {
    title: "Date",
    id: "date",
    icon: <i className="fa fa-calendar" aria-hidden="true"></i>,
    color: "#5d5dff",
    content: FirstStep
  },
  {
    title: "Time",
    id: "time",
    icon: <i className="fa fa-clock-o" aria-hidden="true"></i>,
    color: "#67bb67",
    content: SecondStep
  },
  {
    title: "Notes",
    id: "notes",
    icon: <i className="fa fa-sticky-note-o" aria-hidden="true"></i>,
    color: "#63a7c7",
    content: ThirdStep
  }
]

export default tabs;
