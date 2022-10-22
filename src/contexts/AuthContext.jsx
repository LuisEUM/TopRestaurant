import { createContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getProfile } from "../services/top-restaurant-service";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(undefined); // undefined means loading

  useEffect(() => {
    const isLoaded = localStorage.getItem('user-loaded') === "true";

    if(isLoaded) {
      getProfile()
      .then((user) => setUser(user))
      .catch((error) => setUser(null));
    } else {
      setUser(null)
    }
    
  }, []);


const authenticatedUser = () =>{
  localStorage.setItem('user-loaded', 'true');
  setUser(user)
}

  const value = {
    user,
    setUser: authenticatedUser,
  };

  if (user === undefined) {
    return <></>;
  }

 
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;