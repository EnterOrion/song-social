import { FC } from "react";
import testPFP from "../assets/images/testPFP.jpg";
import heartIcon from "../assets/images/icons/heart2.svg";
import commentIcon from "../assets/images/icons/comment.svg";
import addIcon from "../assets/images/icons/plus.svg";
import { Link } from "react-router-dom";

interface songPost {
  userDisplayName: string;
  pfp: string;
  song: string;
  artist: string;
  description: string;
  time: string;
}

const SongPost: FC = (props: songPost) => {
  return (
    <div className="song-card">
      <div className="post-user">
        <Link to="/profile">
          <img className="post-pfp" src={props.pfp} alt="Profile picture" />
        </Link>{" "}
        <h1 className="user-song">
          <strong>{props.userDisplayName}</strong> is listening to{" "}
          <em>
            {props.song} by {props.artist}
          </em>
        </h1>
      </div>
      <div className="post-info">
        <p className="post-description">{props.description}</p>
        <p className="post-time">{props.time}</p>
      </div>
      <div className="post-actions">
        <a href="" className="svg-cursor">
          <object
            className="heart-icon"
            data={heartIcon}
            type="image/svg+xml"
          ></object>
        </a>
        <a href="" className="svg-cursor">
          <object
            className="add-icon"
            data={addIcon}
            type="image/svg+xml"
          ></object>
        </a>
        <a href="" className="svg-cursor">
          <object
            className="comment-icon"
            data={commentIcon}
            type="image/svg+xml"
          ></object>
        </a>
      </div>
    </div>
  );
};

export default SongPost;
