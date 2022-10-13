import { NavBar } from "./components";
import { Routes, Route, Navigate } from "react-router-dom";
import { DiscoverScreen, CreateRestaurantScreen, LoginScreen, FavoritesScreen, RegisterScreen, AccountScreen, ProfileScreen } from "./screens";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import DetailScreen from "./screens/detail/DetailScreen";
import "./app.css"

function AuthGuard({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}
function App() {
  return (
    <>
      <NavBar />

        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen/>} />

          <Route
            path="/"
            element={
              <AuthGuard>
                <DiscoverScreen />
              </AuthGuard>
            }
          />

          
          <Route
            path="/profile"
            element={
              <AuthGuard>
                <ProfileScreen/>
              </AuthGuard>
            }
          />

          <Route
            path="/favorites"
            element={
              <AuthGuard>
                <FavoritesScreen/>
              </AuthGuard>
            }
          />

          <Route
            path="/account"
            element={
              <AuthGuard>
                <AccountScreen/>
              </AuthGuard>
            }
          />

          <Route
            path="/create-restaurant"
            element={
              <AuthGuard>
                <CreateRestaurantScreen />
              </AuthGuard>
            }
          />
          <Route
            path="/:id"
            element={
              <AuthGuard>
                <DetailScreen />
              </AuthGuard>
            }
          />
        </Routes>
    </>
  );
}

export default App;
