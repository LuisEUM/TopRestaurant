import { NavBar } from "./components";
import { Routes, Route, Navigate } from "react-router-dom";
import { CreateRestaurantScreen, LoginScreen, FavoritesScreen,
         RegisterScreen, AccountScreen, ProfileScreen,
         SearchScreen, RestaurantListScreen, Menu, 
         Products, RestaurantDetailScreen, ControlPanel, Bookings } from "./screens";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
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
          <Route path="/" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen/>} />

          <Route
            path="/discovery"
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
            path="/menu/:id"
            element={
              <AuthGuard>
                  <Menu />
              </AuthGuard>
            }
          />

          <Route
            path="/products/:id"
            element={
              <AuthGuard>
                  <Products />
              </AuthGuard>
            }
          />

          <Route
            path="/bookings/:id"
            element={
              <AuthGuard>
                  <Bookings/>
              </AuthGuard>
            }
          />

          <Route
            path="/admin/:id"
            element={
              <AuthGuard>
                  <ControlPanel/>
              </AuthGuard>
            }
          />
        </Routes> 
    </>
  );
}

export default App;
