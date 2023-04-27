import "./styles/style.scss";
import Nav from "./components/Nav";
import SongPost from "./components/SongPost";
import loopIcon from "./assets/images/icons/loop.svg";
import noteIcon from "./assets/images/icons/note.svg";
import songIcon from "./assets/images/icons/song.svg";
import artistIcon from "./assets/images/icons/artist.svg";
import albumIcon from "./assets/images/icons/album2.svg";

function App() {
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
            <li>
              <strong>Wow</strong> by Beck
            </li>
            <li>
              <strong>Little Talks</strong> by Of Monsters and Men
            </li>
            <li>
              <strong>Somebody I used to know</strong> by Goete
            </li>
            <li>
              <strong>Black Skinhead</strong> by Kanye
            </li>
            <li>
              <strong>Fist of God </strong>by MSTRKRFT
            </li>
          </ol>
        </div>
        <SongPost />
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
                <span className="accent-color">4 different </span> tracks
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
                <span className="accent-color">2 different </span>artists
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
                <span className="accent-color">2 different </span>albums
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
