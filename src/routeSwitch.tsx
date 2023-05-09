import { Routes, Route } from "react-router-dom";
import App from "./App";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import { HashRouter } from "react-router-dom";

const RouteSwitch = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </HashRouter>
  );
};

export default RouteSwitch;
