import { FC, useState } from "react";
import { Link } from "react-router-dom";
import homeIcon from "../assets/images/icons/home.svg";
import bellIcon from "../assets/images/icons/bell.svg";
import profileIcon from "../assets/images/icons/profile.svg";

const Nav: FC = () => {
  const [menuClicked, setMenuClicked] = useState(false);
  const [animate, setAnimate] = useState(0);
  const clickHandler = () => {
    setMenuClicked(!menuClicked);
    if (animate === 0) {
      setAnimate(1);
    } else {
      setAnimate(0);
    }
  };
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
          <Link to="/">
            <object
              className="home-icon"
              data={homeIcon}
              type="image/svg+xml"
            ></object>
          </Link>
          <object
            className="bell-icon"
            data={bellIcon}
            type="image/svg+xml"
          ></object>
          <Link to="/profile">
            <object
              className="profile-icon"
              data={profileIcon}
              type="image/svg+xml"
            ></object>
          </Link>
        </div>
        <div className="nav-mobile">
          <div className="hamburger-wrapper">
            <div
              className="hamburger"
              role="button"
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              animate={animate}
              onClick={clickHandler}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </ul>
    </nav>
  );
};

export default Nav;
