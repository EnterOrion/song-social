import { FC, useEffect, useState } from "react";
import Nav from "../components/Nav";
import NewPost from "../components/NewPost";
import SongPost from "../components/SongPost";
import loopIcon from "../assets/images/icons/loop.svg";
import noteIcon from "../assets/images/icons/note.svg";
import songIcon from "../assets/images/icons/song.svg";
import artistIcon from "../assets/images/icons/artist.svg";
import albumIcon from "../assets/images/icons/album2.svg";
import { getFunctions, httpsCallable } from "firebase/functions";
import LoadingIcon from "../assets/images/util/loading.gif";
import { auth } from "../firebase/init";

// TODO: Tweak styling of loading icon (can be a little too big)

const Home: FC = () => {
  // Will fetch data from DB
  const [topSongs, setTopSongs] = useState([]);
  const [token, setToken] = useState(null);
  const [trackRecord, setTrackRecord] = useState(4);
  const [albumRecord, setAlbumRecord] = useState(2);
  const [artistRecord, setArtistRecord] = useState(2);

  useEffect(() => {
    let token;
    const getTokenExpiration = async () => {
      const functions = getFunctions();
      const getExpiration = httpsCallable(functions, "refreshToken");
      try {
        const result = await getExpiration();
        token = result.data.accessToken;
        setToken(token);
        let topTracks = await fetchWebApi(token);
        topTracks = topTracks.items;
        // Store top tracks so it can be rendered easily with nice formatting
        topTracks = topTracks?.map(({ name, artists }) => (
          <li>
            <strong>{name} </strong>by{" "}
            {artists.map((artist) => artist.name).join(", ")}
          </li>
        ));
        // Update the state
        setTopSongs((prevThingsArray) => {
          return [...prevThingsArray, topTracks];
        });
      } catch (error) {
        console.log(error);
      }
    };

    getTokenExpiration();

    async function fetchWebApi(token) {
      console.log(token);
      const res = await fetch(
        `https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5 `,
        {
          method: "GET",
          headers: {
            Accept: "application/x-www-form-urlencoded; application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return await res.json();
    }
  }, []);

  return (
    <>
      <Nav />
      <div className="home-page">
        <div className="top-tracks">
          <h1>
            {" "}
            <div className="top-track-header">
              <object
                className="loop-icon"
                data={loopIcon}
                type="image/svg+xml"
              ></object>
              Your current<span className="accent-color"> top tracks</span>
            </div>
          </h1>
          <ol>
            {topSongs.length === 0 && (
              <img className="loading-icon" src={LoadingIcon} alt="Loading" />
            )}
            {topSongs}
          </ol>
        </div>
        <div className="song-container">
          <NewPost pfp={auth.currentUser.photoURL} token={token} />
          <SongPost />
        </div>
        <div className="home-profile">
          <h1>
            {" "}
            <object
              className="heart-icon"
              data={noteIcon}
              type="image/svg+xml"
            ></object>{" "}
            So far...
          </h1>
          <h2>You've had on repeat:</h2>
          <ul>
            <li>
              <div className="overview-info">
                <object
                  className="song-icon"
                  data={songIcon}
                  type="image/svg+xml"
                ></object>{" "}
                <span className="accent-color">{trackRecord} different </span>{" "}
                tracks
              </div>
            </li>
            <li>
              {" "}
              <div className="overview-info">
                <object
                  className="artist-icon"
                  data={artistIcon}
                  type="image/svg+xml"
                ></object>{" "}
                <span className="accent-color">{artistRecord} different </span>
                artists
              </div>
            </li>
            <li>
              {" "}
              <div className="overview-info">
                <object
                  className="album-icon"
                  data={albumIcon}
                  type="image/svg+xml"
                ></object>{" "}
                <span className="accent-color">{albumRecord} different </span>
                albums
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
