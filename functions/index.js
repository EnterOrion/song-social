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
  databaseURL: `https://${process.env.GCLOUD_PROJECT}.firebaseio.com`,
});

const SpotifyWebApi = require("spotify-web-api-node");
const Spotify = new SpotifyWebApi({
  clientId: functions.config().spotify.client_id,
  clientSecret: functions.config().spotify.client_secret,
  redirectUri: `https://${process.env.GCLOUD_PROJECT}.firebaseapp.com/popup.html`,
});

const OAUTH_SCOPES = ["user-read-email"];

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

/**
 * Creates a Firebase account with the given user profile and returns a custom auth token allowing
 * signing-in this account.
 * Also saves the accessToken to the datastore at /spotifyAccessToken/$uid
 *
 * @returns {Promise<string>} The Firebase custom auth token in a promise.
 */
async function createFirebaseAccount(
  spotifyID,
  displayName,
  photoURL,
  email,
  accessToken
) {
  // The UID we'll assign to the user.
  const uid = `spotify:${spotifyID}`;

  // Save the access token to the Firebase Realtime Database.
  const databaseTask = admin
    .database()
    .ref(`/spotifyAccessToken/${uid}`)
    .set(accessToken);

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
