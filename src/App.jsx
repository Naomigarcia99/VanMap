import "./assets/styles/App.css";
import Home from "./pages/home.jsx";
import MapPage from "./pages/mapPage.jsx";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/login.jsx";
import Profile from "./pages/profile.jsx";
import ProtectedRoute from "./utils/protectedRoute.jsx";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { RouteProvider } from "./context/RouteContext.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <RouteProvider>
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
        </RouteProvider>
      </AuthProvider>
    </>
  );
}

export default App;
