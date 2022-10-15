import { createContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getProfile } from "../services/top-restaurant-service";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(undefined); // undefined means loading

  useEffect(() => {
    getProfile()
      .then((user) => setUser(user))
      .catch((error) => setUser(null));
  }, []);

  const value = {
    user,
    setUser,
  };

  if (user === undefined) {
    return <></>;
  }

  if (user === null) {
    return <Navigate to={"/login"}></Navigate>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;