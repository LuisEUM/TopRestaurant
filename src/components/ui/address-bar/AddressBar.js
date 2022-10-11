import React from 'react'
import { Link } from "react-router-dom";
import "./AddressBar.css"

function AddressBar({to, address}) {
  return (
      <div className="d-flex flex-row justify-content-center bg-secondary address-bar py-3 flex-wrap address-shadow fixed-top">
        <Link className="navbar-brand px-2 d-flex justify-content-end align-items-center align-self-center" to={to}>
          <i className="fa fa-map-marker text-white d-flex align-items-center align-self-center text-white " />
        </Link>
        <p className=' px-2 text-center m-0 fs-6 d-flex  justify-content-center align-items-center text-white'> {address} </p>
      </div>
  )
}

export default AddressBar