import { FC } from "react";
import NewPost from "./NewPost";
import testPFP from "../assets/images/testPFP.jpg";
import heartIcon from "../assets/images/icons/heart2.svg";
import commentIcon from "../assets/images/icons/comment.svg";
import addIcon from "../assets/images/icons/plus.svg";

const SongPost: FC = () => {
  return (
    <div className="song-container">
      <NewPost />
      <div className="song-card">
        <div className="post-user">
          <img className="post-pfp" src={testPFP} alt="User profile picture" />{" "}
          <h1 className="user-song">
            <strong>Elliot</strong> is listening to{" "}
            <em>Fist of God by MSTRKRFT</em>
          </h1>
        </div>
        <div className="post-info">
          <p className="post-description">
            I feel like it suits my mood. I've never heard something as good as
            this! I think that this is a good song. An amazing song. Wow, I love
            music so much. I think that there's no need to listen to other.
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
    </div>
  );
};

export default SongPost;
