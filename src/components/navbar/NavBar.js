import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function NavBar() {
const {user} = useContext(AuthContext)

  if(user) return (
    <nav className="navbar navbar-expand-lg bg-light main-nav fixed-bottom shadow-lg">
      <div className="d-flex flex-row justify-content-around w-100">
              <NavLink
                to="/discovery"
                className={({ isActive }) =>
                isActive ? "nav-link text-primary active col text-center" : "nav-link text-secondary nav-item col text-center"
                }
              >
                <i className="fa fa-compass fa-2x fa-fw" />
              </NavLink>
              <NavLink
                to="/search"
                className={({ isActive }) =>
                isActive ? "nav-link text-primary active col text-center" : "nav-link text-secondary nav-item col text-center"
                }
              >
                <i className="fa fa-search fa-2x fa-fw" />
              </NavLink>
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                isActive ? "nav-link text-primary active col text-center" : "nav-link text-secondary nav-item col text-center"
                }
              >
                <i className="fa fa-heart fa-2x fa-fw" />
              </NavLink>
              <NavLink
                to="/account"
                className={({ isActive }) =>
                isActive ? "nav-link text-primary active col text-center" : "nav-link text-secondary nav-item col text-center"
                }
              >
                <i className="fa fa-user-o fa-2x fa-fw" />
              </NavLink>
        </div>
    </nav>
  );
}

export default NavBar;
