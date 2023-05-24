import "./styles/style.scss";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => JSON.parse(localStorage.getItem("auth")) || false
  );

  console.log(isLoggedIn);

  if (isLoggedIn) {
    return <Home />;
  } else {
    return <Login />;
  }
}

export default App;
