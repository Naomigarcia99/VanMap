import "./assets/styles/App.css";
import Home from "./pages/home.jsx";
import MapPage from "./pages/mapPage.jsx";
import Navbar from "./components/Navbar";
import Login from "./pages/login.jsx";
import Profile from "./pages/profile.jsx";
import ProtectedRoute from "./utils/protectedRoute.jsx";
import { Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext.jsx";
import { RouteProvider } from "./context/RouteContext";

function App() {
  return (
    <>
      <AppProvider>
        <RouteProvider>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Home />} />
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
            </Routes>
            <Navbar />
          </AuthProvider>
        </RouteProvider>
      </AppProvider>
    </>
  );
}

export default App;
