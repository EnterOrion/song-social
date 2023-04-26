import { FC } from "react";
import testPFP from "../assets/images/testPFP.jpg";

const NewPost: FC = () => {
  return (
    <div className="new-post">
      <div className="post-user">
        <img className="post-pfp" src={testPFP} alt="User profile picture" />
        <h1 className="user-song larger">
          <strong>What have you been listening to on repeat?</strong>
        </h1>
      </div>
      <form action="">
        <div className="post-input">
          <input type="text" placeholder="Enter the track title here" />
          <textarea placeholder="List some reasons why. Reminds you of an old crush? It fits the weather right now?" />
        </div>
        <button className="submit-post">Submit</button>
      </form>
    </div>
  );
};

export default NewPost;
