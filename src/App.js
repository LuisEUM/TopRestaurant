import { NavBar } from "./components";
import { Routes, Route, Navigate } from "react-router-dom";
import { CreateRestaurantScreen, LoginScreen, FavoritesScreen, RegisterScreen, AccountScreen, ProfileScreen, SearchScreen, RestaurantListScreen } from "./screens";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import RestaurantDetailScreen from "./screens/restaurant/detail-restaurant/RestaurantDetailScreen";
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
                <RestaurantListScreen />
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
            path="/search"
            element={
              <AuthGuard>
                <SearchScreen/>
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
            path="/restaurants/:id"
            element={
              <AuthGuard>
                <RestaurantDetailScreen />
              </AuthGuard>
            }
          />

          <Route
            path="/menus/:id"
            element={
              <AuthGuard>
                <RestaurantDetailScreen />
              </AuthGuard>
            }
          />
        </Routes>
    </>
  );
}

export default App;
