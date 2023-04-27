import { FC } from "react";
import vinylIcon from "../assets/images/vinyl.png";
import loopIcon from "../assets/images/icons/loop.svg";

const Login: FC = () => {
  return (
    <div className="login-page">
      <div className="login-content">
        <h1 className="login-header">Music listening made social.</h1>
        <div className="form-container">
          <img className="login-icon" src={vinylIcon} alt="Vinyl Icon" />
          <h2>
            What have you been listening to on{" "}
            <object
              className="loop-icon alt-margin"
              data={loopIcon}
              type="image/svg+xml"
            ></object>
            ?
          </h2>
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
