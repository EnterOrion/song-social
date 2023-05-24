import { FC } from "react";
import testPFP from "../assets/images/testPFP.jpg";
import { Link } from "react-router-dom";

const UserCard: FC = () => {
  return (
    <div className="user-card">
      <div className="u-card-picture">
        <img className="u-card-pfp" src={testPFP} alt="User profile picture" />
      </div>
      <div className="u-card-info">
        <div className="u-card-upper">
          <p className="u-card-name">
            <strong>Elliot</strong>
          </p>
          <p>
            {" "}
            <em>
              A lover of electronic music. I like to listen to music that makes
              me energized.
            </em>
          </p>
        </div>
        <div className="u-card-lower">
          <ul>
            <li>
              <strong>15</strong> Followers
            </li>
            <li>
              <strong>4</strong> Posts
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
