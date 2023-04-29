import { FC } from "react";
import Nav from "../components/Nav";
import SongPost from "../components/SongPost";
import UserCard from "../components/UserCard";

const SearchResults: FC = () => {
  return (
    <>
      <Nav />
      <div className="search-page">
        <div className="search-header">
          <h1 className="search-posts accent-color">Posts</h1>
          <h1 className="search-users">Users</h1>
        </div>
        <div className="song-container less-padding2">
          <UserCard />
          {/* <SongPost /> */}
        </div>
      </div>
    </>
  );
};

export default SearchResults;
