import { FC } from "react";
import testPFP from "../assets/images/testPFP.jpg";
import { Link } from "react-router-dom";

const NewPost: FC = () => {
  return (
    <div className="new-post">
      <div className="post-user">
        <Link to="/profile">
          <img className="post-pfp" src={testPFP} alt="User profile picture" />
        </Link>
        <h1 className="user-song larger">
          <strong>What have you been listening to on repeat?</strong>
        </h1>
      </div>
      <form action="">
        <div className="post-input">
          <input type="text" placeholder="Enter the track title here" />
          <input type="text" placeholder="Enter the artist of the track" />
          <textarea placeholder="List some reasons why. Reminds you of an old crush? It fits the weather right now?" />
        </div>
        <button className="submit-post">Submit</button>
      </form>
    </div>
  );
};

export default NewPost;
