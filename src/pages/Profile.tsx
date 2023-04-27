import { FC } from "react";
import Nav from "../components/Nav";
import testPFP from "../assets/images/testPFP.jpg";
import loopIcon from "../assets/images/icons/loop2.svg";
import graphIcon from "../assets/images/icons/graph.svg";
import songIcon from "../assets/images/icons/song.svg";
import artistIcon from "../assets/images/icons/artist.svg";
import albumIcon from "../assets/images/icons/album2.svg";

const Profile: FC = () => {
  return (
    <>
      <Nav />
      <div className="profile-page">
        <div className="profile-upper-half">
          <div className="prof-pic-name">
            <img
              className="profile-pfp"
              src={testPFP}
              alt="User profile picture"
            />
            <div className="prof-name-tag">
              <p className="prof-name">Elliot</p>
              <p className="prof-tagline">
                A lover of electronic music. I like to listen to music that
                makes me energized.
              </p>
            </div>
          </div>
          <div className="follower-column">
            <h1>
              {" "}
              <object
                className="graph-icon"
                data={graphIcon}
                type="image/svg+xml"
              ></object>
              Overview
            </h1>
            <ul>
              <li>
                <strong>4</strong> Posts
              </li>
              <li>
                <strong>15</strong> Followers
              </li>
              <li>
                <strong>20</strong> Following
              </li>
            </ul>
          </div>
          <div className="stats-column">
            <h1 className="stats-header">
              {" "}
              <object
                className="loop-icon"
                data={loopIcon}
                type="image/svg+xml"
              ></object>
              Has had on repeat
            </h1>
            <ul>
              <li>
                {" "}
                <div className="overview-info less-padding">
                  <object
                    className="song-icon smaller"
                    data={songIcon}
                    type="image/svg+xml"
                  ></object>{" "}
                  <div className="overview-text">
                    <strong>4 different</strong> tracks
                  </div>
                </div>
              </li>
              <li>
                <div className="overview-info less-padding">
                  <object
                    className="artist-icon smaller"
                    data={artistIcon}
                    type="image/svg+xml"
                  ></object>{" "}
                  <div className="overview-text">
                    <strong>2 different</strong> artists
                  </div>
                </div>
              </li>
              <li>
                <div className="overview-info less-padding">
                  <object
                    className="album-icon"
                    data={albumIcon}
                    type="image/svg+xml"
                  ></object>{" "}
                  <div className="over-view-text">
                    <strong>2 different</strong> albums
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="profile-lower-half"></div>
      </div>
    </>
  );
};

export default Profile;
