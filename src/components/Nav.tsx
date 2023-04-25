import { FC } from "react";

const Nav: FC = () => {
  return (
    <nav>
      <ul>
        <div className="nav-1">
          <li>Song-social</li>
        </div>

        <form className="nav-2">
          <input type="text" placeholder="Search" />
        </form>
        <div className="nav-3">
          <li>Home</li>
          <li>Notifications</li>
          <li>Profile</li>
        </div>
      </ul>
    </nav>
  );
};

export default Nav;
