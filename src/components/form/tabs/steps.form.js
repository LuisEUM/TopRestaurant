import React from "react";
import FirstStep from "../first-step/FirstStep";
import formContent from "../form-content/FormContent";

// Configure our tabs and tab content here
const tabs = [
  {
    title: "1st Step",
    id: "step1",
    icon: <i class="fa fa-calendar" aria-hidden="true"></i>,
    color: "#5d5dff",
    content: FirstStep
  },
  {
    title: "2nd Step",
    id: "step2",
    icon: <i class="fa fa-clock-o" aria-hidden="true"></i>,
    color: "#67bb67",
    content: formContent
  },
  {
    title: "3nd Step",
    id: "step3",
    icon: <i class="fa fa-sticky-note-o" aria-hidden="true"></i>,
    color: "#63a7c7",
    content: formContent
  }
]

export default tabs;
