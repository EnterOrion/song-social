import { FC, useState } from "react";
import Nav from "../components/Nav";
import ProfilePost from "../components/ProfilePost";
import loopIcon from "../assets/images/icons/loop2.svg";
import graphIcon from "../assets/images/icons/graph.svg";
import songIcon from "../assets/images/icons/song.svg";
import artistIcon from "../assets/images/icons/artist.svg";
import albumIcon from "../assets/images/icons/album2.svg";
import testAlbum1 from "../assets/images/testAlbum1.jpeg";
import testAlbum2 from "../assets/images/testAlbum2.png";
import testAlbum3 from "../assets/images/testAlbum3.jpg";
import { auth } from "../firebase/init";

const Profile: FC = () => {
  // Will add useEffect to fetch from DB
  const [posts, setPosts] = useState(4);
  const [followers, setFollowers] = useState(15);
  const [following, setFollowing] = useState(20);
  return (
    <>
      <Nav />
      <div className="profile-page">
        <div className="profile-upper-half">
          <div className="prof-pic-name">
            <img
              className="profile-pfp"
              src={auth.currentUser.photoURL}
              alt="User profile picture"
            />
            <div className="prof-name-tag">
              <p className="prof-name">{auth.currentUser.displayName}</p>
              <p className="prof-tagline">
                A lover of electronic music. I like to listen to music that
                makes me energized.
              </p>
            </div>
          </div>
          <div className="follower-column">
            <h1 className="overview-header">
              <div className="overview-info">
                {" "}
                <object
                  className="graph-icon"
                  data={graphIcon}
                  type="image/svg+xml"
                ></object>
                Overview
              </div>
            </h1>
            <ul>
              <li>
                <strong>{posts}</strong> Posts
              </li>
              <li>
                <strong>{followers}</strong> Followers
              </li>
              <li>
                <strong>{following}</strong> Following
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
        {/* This will be mapped from the database */}
        <div className="profile-lower-half">
          <ProfilePost
            albumCover={testAlbum1}
            albumAlt=""
            likes={14}
            comments={1}
          />
          <ProfilePost
            albumCover={testAlbum2}
            albumAlt=""
            likes={23}
            comments={3}
          />
          <ProfilePost
            albumCover={testAlbum3}
            albumAlt=""
            likes={56}
            comments={2}
          />
        </div>
      </div>
    </>
  );
};

export default Profile;
