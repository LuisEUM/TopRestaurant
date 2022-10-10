import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function NavBar() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-lg bg-light main-nav fixed-bottom shadow-lg">
      <div className="d-flex flex-row justify-content-around w-100">
              <NavLink
                to="/create-restaurant"
                className={({ isActive }) =>
                isActive ? "nav-link active col text-center" : "nav-link nav-item col text-center"
                }
              >
                <i className="fa fa-compass" />
              </NavLink>
              <NavLink
                to="/create-restaurant"
                className={({ isActive }) =>
                isActive ? "nav-link active col text-center" : "nav-link nav-item col text-center"
                }
              >
                <i className="fa fa-search" />
              </NavLink>
              <NavLink
                to="/create-restaurant"
                className={({ isActive }) =>
                isActive ? "nav-link active col text-center" : "nav-link nav-item col text-center"
                }
              >
                <i className="fa fa-heart" />
              </NavLink>
              <NavLink
                to="/create-restaurant"
                className={({ isActive }) =>
                isActive ? "nav-link active col text-center" : "nav-link nav-item col text-center"
                }
              >
                <i className="fa fa-user" />
              </NavLink>
        </div>
    </nav>
  );
}

export default NavBar;
