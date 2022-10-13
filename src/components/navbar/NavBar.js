import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {

  return (
    <nav className="navbar navbar-expand-lg bg-light main-nav fixed-bottom shadow-lg">
      <div className="d-flex flex-row justify-content-around w-100">
              <NavLink
                to="/"
                className={({ isActive }) =>
                isActive ? "nav-link active col text-center" : "nav-link nav-item col text-center"
                }
              >
                <i className="fa fa-compass fa-fw" />
              </NavLink>
              <NavLink
                to="/create-restaurant"
                className={({ isActive }) =>
                isActive ? "nav-link active col text-center" : "nav-link nav-item col text-center"
                }
              >
                <i className="fa fa-search fa-fw" />
              </NavLink>
              <NavLink
                to="/create-restaurant"
                className={({ isActive }) =>
                isActive ? "nav-link active col text-center" : "nav-link nav-item col text-center"
                }
              >
                <i className="fa fa-calendar-o fa-fwfa-fw" />
              </NavLink>
              <NavLink
                to="/account"
                className={({ isActive }) =>
                isActive ? "nav-link active col text-center" : "nav-link nav-item col text-center"
                }
              >
                <i className="fa fa-user-o fa-fw" />
              </NavLink>
        </div>
    </nav>
  );
}

export default NavBar;
