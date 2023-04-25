import { FC } from "react";
import homeIcon from "../assets/images/icons/home.svg";
import bellIcon from "../assets/images/icons/bell.svg";
import profileIcon from "../assets/images/icons/profile.svg";

const Nav: FC = () => {
  return (
    <nav>
      <ul>
        <div className="nav-1">
          <li>On Repeat</li>
        </div>

        <form className="nav-2">
          <input type="text" placeholder="Search" />
        </form>
        <div className="nav-3">
          <object
            className="home-icon"
            data={homeIcon}
            type="image/svg+xml"
          ></object>
          <object
            className="bell-icon"
            data={bellIcon}
            type="image/svg+xml"
          ></object>
          <object
            className="profile-icon"
            data={profileIcon}
            type="image/svg+xml"
          ></object>
        </div>
        <div className="nav-mobile">=</div>
      </ul>
    </nav>
  );
};

export default Nav;
