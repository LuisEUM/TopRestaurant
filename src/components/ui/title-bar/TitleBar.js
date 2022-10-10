import React from 'react'
import { Link } from "react-router-dom";

function TitleBar({to, title}) {
  return (
      <nav className="fluid-container  d-flex flex-row justify-content-start shadow-sm  py-3">
        <Link className="navbar-brand col-1 d-flex justify-content-center align-items-center align-self-center" to={to}>
        <i className="fa fa-chevron-left  d-flex align-items-center align-self-center " />
        </Link>
        <h1 className='col-11 text m-0 fs-2 d-flex align-items-center'> {title} </h1>
        
      </nav>
  )
}

export default TitleBar