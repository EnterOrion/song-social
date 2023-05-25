import "./styles/style.scss";
import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";

// Revise
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => JSON.parse(localStorage.getItem("auth")) || false
  );

  if (isLoggedIn) {
    return <Home />;
  } else {
    return <Login />;
  }
}

export default App;
