import { FC } from "react";
interface songItem {
  albumCover: any;
  albumAlt: string;
  likes: number;
  comments: number;
}

const ProfilePost: FC = (props: songItem) => {
  return (
    <div className="song-item">
      <img
        src={props.albumCover}
        alt={props.albumAlt}
        className="song-item-photo"
      />
      <div className="song-item-info">
        <ul>
          <li className="song-item-likes">
            <span className="hidden">Likes:</span>
            <i className="fas fa-heart" aria-hidden="true"></i> {props.likes}
          </li>
          <li className="song-item-comments">
            <span className="hidden">Comments:</span>
            <i className="fas fa-comment" aria-hidden="true"></i>{" "}
            {props.comments}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfilePost;
