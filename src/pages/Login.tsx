import { FC, useEffect } from "react";
import { app, auth } from "../firebase/init.ts";
import vinylIcon from "../assets/images/vinyl.png";
import { getFunctions, httpsCallable } from "firebase/functions";

const Login: FC = () => {
  function getURLParameter(name: string) {
    return (
      decodeURIComponent(
        (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
          location.search
        ) || [null, ""])[1].replace(/\+/g, "%20")
      ) || null
    );
  }

  function getFirebaseProjectId() {
    if (app.options.authDomain?.split(".")[0] != undefined) {
      const firebaseProjectId = app.options.authDomain?.split(".")[0];
      return firebaseProjectId;
    } else {
      console.log("error: project not found!");
    }
  }

  const code = getURLParameter("code");
  const state = getURLParameter("state");
  const error = getURLParameter("error");

  if (error) {
    document.body.innerText = "Error back from the Spotify auth page: " + error;
  } else if (!code) {
    // Start the auth flow.
    window.location.href =
      "https://us-central1-" +
      getFirebaseProjectId() +
      ".cloudfunctions.net/redirect";
  }
  useEffect(() => {
    const tryLogin = async () => {
      console.log(code);
      console.log(state);
      const functions = getFunctions();
      const getLoginToken = httpsCallable(functions, "login");
      try {
        const result = await getLoginToken({
          state: state,
          code: code,
        });
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };
    tryLogin();
  }, []);

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
