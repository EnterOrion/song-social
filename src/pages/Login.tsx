import { FC } from "react";
import vinylIcon from "../assets/images/vinyl.png";

const Login: FC = () => {
  return (
    <div className="login-page">
      <div className="login-content">
        <h1 className="login-header">Music listening made social.</h1>
        <div className="form-container">
          <img className="login-icon" src={vinylIcon} alt="Vinyl Icon" />
          <h2 className="bottom-margin">
            What have you been listening to on repeat?
          </h2>
          <h2>Connect today!</h2>
          <form>
            <div className="button-section">
              <button className="spotify-button">Register with Spotify</button>
              <button className="login-button">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
