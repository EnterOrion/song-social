import { FC } from "react";
import testPFP from "../assets/test-pfp.jpeg";
import heartIcon from "../assets/heart2.svg";
import commentIcon from "../assets/comment.svg";
import addIcon from "../assets/plus.svg";

const SongPost: FC = () => {
  return (
    <div className="song-container">
      <div className="song-card">
        <div className="post-user">
          <img className="post-pfp" src={testPFP} alt="User profile picture" />{" "}
          <h1 className="user-song">
            Elliot is listening to Fist of God by MSTRKRFT
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
