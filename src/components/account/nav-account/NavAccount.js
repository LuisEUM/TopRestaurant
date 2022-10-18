import React, { useContext }from "react";
import { NavLink } from "react-router-dom";
import * as restaurantsService from '../../../services/top-restaurant-service';
import { AuthContext } from "../../../contexts/AuthContext";


function NavAccount() {
const { setUser, user } = useContext(AuthContext);
  
console.log(user.id)


const logout = () => {
  restaurantsService.logout()
      .then(() => {
        setUser(null)
      } )
      .catch((error) => setUser(null));

}



  return (
    <div className="container">
      <div className="d-flex row justify-content-center pt-5 ">
        <div className="d-flex col-10 py-3 border-bottom ">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? " justify-content-center  active text-left  link-secondary  text-decoration-none"
                : " link-secondary  nav-item  text-center text-decoration-none"
            }
          >
            <i className="fa fa-user-o fa-fw" />
            &nbsp; Profile
          </NavLink>
        </div>

        {/* <div className="d-flex col-10 py-3 border-bottom">
          <NavLink
            to="/my_bookings"
            className={({ isActive }) =>
              isActive
              ? " justify-content-center  active text-left  link-secondary  text-decoration-none"
                : " link-secondary  nav-item  text-center text-decoration-none"
            }
          >
            <i className="fa fa-calendar-o fa-fw fa-fw" />
            &nbsp; My Bookings
          </NavLink>
        </div> */}

        <div className="d-flex col-10 py-3 border-bottom">
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive
              ? " justify-content-center  active text-left  link-secondary  text-decoration-none"
                : " link-secondary  nav-item  text-center text-decoration-none"
            }
          >
            <i className="fa fa-heart-o fa-fw fa-fw" />
            &nbsp; Favorites
          </NavLink>
        </div>

        {/* <div className="d-flex col-10 py-3 border-bottom">
          <NavLink
            to="/my_address"
            className={({ isActive }) =>
              isActive
              ? " justify-content-center  active text-left  link-secondary  text-decoration-none"
                : " link-secondary  nav-item  text-center text-decoration-none"
            }
          >
            <i className="fa fa-map-pin fa-fw fa-fw" />
            &nbsp; My Address
          </NavLink>
        </div> */}


        <div className="d-flex col-10 py-3 border-bottom">
          <NavLink
            to={`/admin/${user.id}`}
            className={({ isActive }) =>
              isActive
              ? " justify-content-center  active text-left  link-secondary  text-decoration-none"
                : " link-secondary  nav-item  text-center text-decoration-none"
            }
          >
            <i className="fa fa-key fa-fw fa-fw" />
            &nbsp; Admin (Control Panel)
          </NavLink>
        </div>


        <div className="d-flex col-10 py-3 border-bottom">
          <NavLink
            to="/configurations"
            className={({ isActive }) =>
              isActive
              ? " justify-content-center  active text-left  link-secondary  text-decoration-none"
                : " link-secondary  nav-item  text-center text-decoration-none"
            }
          >
            <i className="fa fa-cog fa-fw fa-fw" />
            &nbsp; Configurations
          </NavLink>
        </div>

        <div className="d-flex col-10 py-3 border-bottom">
          <NavLink
            onClick={logout}
            className={({ isActive }) =>
              isActive
              ? " justify-content-center  active text-left  link-secondary  text-decoration-none"
                : " link-secondary  nav-item  text-center text-decoration-none"
            }
          >
            <i className="fa  fa-sign-out fa-fw fa-fw" />
            &nbsp; Logout
          </NavLink>
        </div>

      </div>
    </div>
  );
}

export default NavAccount;
