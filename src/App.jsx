import "./assets/styles/App.css";
import Home from "./pages/home.jsx";
import { Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </AppProvider>
    </>
  );
}

export default App;