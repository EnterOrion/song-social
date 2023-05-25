import { FC } from "react";
import { Link } from "react-router-dom";

interface newPostContents {
  pfp: "string";
}

const NewPost: FC = (props: newPostContents) => {
  return (
    <div className="new-post">
      <div className="post-user">
        <Link to="/profile">
          <img
            className="post-pfp"
            src={props.pfp}
            alt="User profile picture"
          />
        </Link>
        <h1 className="user-song larger">
          <strong>What have you been listening to on repeat?</strong>
        </h1>
      </div>
      <form action="">
        <div className="post-input">
          <input
            type="text"
            placeholder="Enter the track title here as it appears on Spotify"
          />
          <input
            type="text"
            placeholder="Enter the artist of the track as it appears on Spotify"
          />
          <textarea placeholder="List some reasons why. Reminds you of an old crush? It fits the weather right now?" />
        </div>
        <button className="submit-post">Submit</button>
      </form>
    </div>
  );
};

export default NewPost;
