import { FC } from "react";
import testPFP from "../assets/images/testPFP.jpg";
import heartIcon from "../assets/images/icons/heart2.svg";
import commentIcon from "../assets/images/icons/comment.svg";
import addIcon from "../assets/images/icons/plus.svg";
import { Link } from "react-router-dom";

const SongPost: FC = () => {
  return (
    <div className="song-card">
      <div className="post-user">
        <Link to="/profile">
          <img className="post-pfp" src={testPFP} alt="User profile picture" />
        </Link>{" "}
        <h1 className="user-song">
          <strong>Elliot</strong> is listening to{" "}
          <em>Fist of God by MSTRKRFT</em>
        </h1>
      </div>
      <div className="post-info">
        <p className="post-description">
          I feel like it suits my mood. I've been trying to save the world from
          evil corporations and this song gets me motivated to keep going. It
          has a lot of energy.
        </p>
        <p className="post-time">30 minutes ago</p>
      </div>
      <div className="post-actions">
        <object
          className="heart-icon"
          data={heartIcon}
          type="image/svg+xml"
        ></object>
        <object
          className="add-icon"
          data={addIcon}
          type="image/svg+xml"
        ></object>
        <object
          className="comment-icon"
          data={commentIcon}
          type="image/svg+xml"
        ></object>
      </div>
    </div>
  );
};

export default SongPost;
