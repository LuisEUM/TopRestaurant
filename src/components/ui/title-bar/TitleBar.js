import React from 'react'
import { Link } from "react-router-dom";
import "./TitleBar.css"

function TitleBar({to, title, className}) {
  return (
      <nav className={`d-flex flex-row justify-content-start shadow-sm title-bar py-3 fixed-top ${className}`}>
        <Link className="navbar-brand col-1 d-flex justify-content-end align-items-center align-self-center" to={to}>
        <i className="fa fa-chevron-left d-flex align-items-center align-self-center " />
        </Link>
        <h1 className='col-10 text-center m-0 fs-4 d-flex  justify-content-center align-items-center fw-bold'> {title} </h1>
      </nav>
  )
}

export default TitleBar