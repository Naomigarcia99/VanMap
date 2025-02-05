import "./assets/styles/App.css";
import Home from "./pages/home.jsx";
import MapPage from "./pages/mapPage.jsx";
import Navbar from "./components/ui/Navbar.jsx";
import Login from "./pages/login.jsx";
import Profile from "./pages/profile.jsx";
import NotFound from "./pages/notFound.jsx";
import ProtectedRoute from "./utils/protectedRoute.jsx";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { RouteProvider } from "./context/RouteContext.jsx";
import { MapProvider } from "./context/MapContext.jsx";
import { FavoritesProvider } from "./context/FavoritesContext.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <RouteProvider>
          <MapProvider>
            <FavoritesProvider>
              <Routes>
                <Route index element={<Home />} />
                <Route
                  path="/map"
                  element={
                    <ProtectedRoute>
                    <MapPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Navbar />
            </FavoritesProvider>
          </MapProvider>
        </RouteProvider>
      </AuthProvider>
    </>
  );
}

export default App;
