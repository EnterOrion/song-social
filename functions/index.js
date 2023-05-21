// TO-DO: BREAK UP INTO MULTIPLE FILES

/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const functions = require("firebase-functions");
const cookieParser = require("cookie-parser");
const crypto = require("node:crypto");

// Firebase Setup
const admin = require("firebase-admin");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const serviceAccount = require("./service-account.json");

// eslint-disable-next-line @typescript-eslint/no-var-requires
admin.initializeApp({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.GCLOUD_PROJECT}-default-rtdb.firebaseio.com`,
});

const SpotifyWebApi = require("spotify-web-api-node");
const Spotify = new SpotifyWebApi({
  clientId: functions.config().spotify.client_id,
  clientSecret: functions.config().spotify.client_secret,
  redirectUri: `http://localhost:5173/`,
});

const OAUTH_SCOPES = ["user-read-email, user-top-read"];

exports.redirect = functions.https.onRequest((req, res) => {
  cookieParser()(req, res, () => {
    const state = req.cookies.state || crypto.randomBytes(20).toString("hex");
    functions.logger.log("Setting verification state:", state);
    res.cookie("state", state.toString(), {
      maxAge: 3600000,
      secure: true,
      httpOnly: true,
    });
    const authorizeURL = Spotify.createAuthorizeURL(
      OAUTH_SCOPES,
      state.toString()
    );
    res.redirect(authorizeURL);
  });
});

exports.token = functions.https.onRequest((req, res) => {
  try {
    cookieParser()(req, res, () => {
      functions.logger.log("Received verification state:", req.cookies.state);
      functions.logger.log("Received state:", req.query.state);
      if (!req.cookies.state) {
        throw new Error(
          "State cookie not set or expired. Maybe you took too long to authorize. Please try again."
        );
      } else if (req.cookies.state !== req.query.state) {
        throw new Error("State validation failed");
      }
      functions.logger.log("Received auth code:", req.query.code);
      Spotify.authorizationCodeGrant(req.query.code, (error, data) => {
        if (error) {
          throw error;
        }
        functions.logger.log(
          "Received Access Token:",
          data.body["access_token"]
        );
        Spotify.setAccessToken(data.body["access_token"]);

        Spotify.getMe(async (error, userResults) => {
          if (error) {
            throw error;
          }
          functions.logger.log(
            "Auth code exchange result received:",
            userResults
          );
          // We have a Spotify access token and the user identity now.
          const accessToken = data.body["access_token"];
          const spotifyUserID = userResults.body["id"];
          const profilePic = userResults.body["images"][0]["url"];
          const userName = userResults.body["display_name"];
          const email = userResults.body["email"];

          // Create a Firebase account and get the Custom Auth Token.
          const firebaseToken = await createFirebaseAccount(
            spotifyUserID,
            userName,
            profilePic,
            email,
            accessToken
          );
          // Serve an HTML page that signs the user in and updates the user profile.
          res.jsonp({ token: firebaseToken });
        });
      });
    });
  } catch (error) {
    res.jsonp({ error: error.toString() });
  }
  return null;
});

exports.login = functions.https.onCall((data, context) => {
  return new Promise((resolve, reject) => {
    functions.logger.log("Received verification state:", data.state);
    functions.logger.log("Received auth code:", data.code);
    try {
      Spotify.authorizationCodeGrant(data.code, (error, data2) => {
        if (error) {
          reject(error);
        }
        functions.logger.log(
          "Received Access Token:",
          data2.body["access_token"]
        );
        Spotify.setAccessToken(data2.body["access_token"]);

        Spotify.getMe(async (error, userResults) => {
          if (error) {
            reject(error);
          }
          functions.logger.log(
            "Auth code exchange result received:",
            userResults
          );
          // We have a Spotify access token and the user identity now.
          const accessToken = data2.body["access_token"];
          const refreshToken = data2.body["refresh_token"];
          const tokenExpiration = data2.body["expires_in"];
          const spotifyUserID = userResults.body["id"];
          const profilePic = userResults.body["images"][0]["url"];
          const userName = userResults.body["display_name"];
          const email = userResults.body["email"];

          // Create a Firebase account and get the Custom Auth Token.
          // Need to save refresh token and expiration date
          const firebaseToken = await createFirebaseAccount(
            spotifyUserID,
            userName,
            profilePic,
            email,
            accessToken,
            refreshToken,
            tokenExpiration
          );
          resolve({ token: firebaseToken });
        });
      });
    } catch (error) {
      functions.logger.log("Login error!", error);
      reject(error);
    }
  });
});

/**
 * Creates a Firebase account with the given user profile and returns a custom auth token allowing
 * signing-in this account.
 * Also saves the accessToken, the freshToken, and the token's expiration to the datastore at /spotifyAccessToken/$uid
 *
 * @returns {Promise<string>} The Firebase custom auth token in a promise.
 */
async function createFirebaseAccount(
  spotifyID,
  displayName,
  photoURL,
  email,
  accessToken,
  refreshToken,
  tokenExpiration
) {
  const profileAPIData = {
    accessToken: accessToken,
    refreshToken: refreshToken,
    tokenExpiration: Date.now() + tokenExpiration * 1000 - 10000,
  };

  // The UID we'll assign to the user.
  const uid = `spotify:${spotifyID}`;

  // Save the access token to the Firebase Realtime Database.
  const databaseTask = admin
    .database()
    .ref(`/spotifyAccessToken/${uid}`)
    .set(profileAPIData);

  // Create or update the user account.
  const userCreationTask = admin
    .auth()
    .updateUser(uid, {
      displayName: displayName,
      photoURL: photoURL,
      email: email,
      emailVerified: true,
    })
    .catch((error) => {
      // If user does not exists we create it.
      if (error.code === "auth/user-not-found") {
        return admin.auth().createUser({
          uid: uid,
          displayName: displayName,
          photoURL: photoURL,
          email: email,
          emailVerified: true,
        });
      }
      throw error;
    });

  // Wait for all async tasks to complete, then generate and return a custom auth token.
  await Promise.all([userCreationTask, databaseTask]);
  // Create a Firebase custom auth token.
  const token = await admin.auth().createCustomToken(uid);
  functions.logger.log(
    'Created Custom token for UID "',
    uid,
    '" Token:',
    token
  );
  return token;
}

exports.refreshToken = functions.https.onCall(async (data, context) => {
  return new Promise((resolve, reject) => {
    const uid = context.auth.uid;

    const queryCurrentAccessToken = admin
      .database()
      .ref(`/spotifyAccessToken/${uid}`)
      .on(
        "value",
        (snapshot) => {
          console.log(snapshot.val().tokenExpiration);
          const checkTokenExpiration = snapshot.val().tokenExpiration;
          const checkAccessToken = snapshot.val().accessToken;
          const checkRefreshToken = snapshot.val().refreshToken;

          Spotify.setRefreshToken(checkRefreshToken);

          function refreshSpotifyToken() {
            Spotify.refreshAccessToken().then(
              function (data) {
                console.log("The access token has been refreshed!");

                // Save the access token so that it's used in future calls
                //spotifyApi.setAccessToken(data.body["access_token"]);
                console.log("The access token is " + data.body["access_token"]);
                console.log("The token expires in " + data.body["expires_in"]);

                const newExpiration =
                  Date.now() + data.body["expires_in"] * 1000 - 10000;

                // This could be written in a better async fashion
                const updateDatabaseToken = admin
                  .database()
                  .ref(`/spotifyAccessToken/${uid}`)
                  .update({
                    accessToken: data.body["access_token"],
                    tokenExpiration: newExpiration,
                  });

                resolve({
                  success: true,
                  result: "New token generated",
                  newAccessToken: data.body["access_token"],
                });
              },
              function (err) {
                console.log("Could not refresh access token", err);
                resolve({
                  result: "error!",
                });
              }
            );
          }

          if (Date.now() < checkTokenExpiration - 5 * 60 * 1000) {
            // if token is still valid, return access token
            console.log("true!");
            resolve({
              success: true,
              result: "Previous token still valid",
              accessToken: checkAccessToken,
            });
          } else {
            refreshSpotifyToken();
            console.log("false!");
          }
        },
        (errorObject) => {
          console.log("The read failed: " + errorObject.name);
          reject(errorObject.name);
        }
      );
  });
});
