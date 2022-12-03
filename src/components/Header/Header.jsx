import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./style.scss";

const Header = () => {
  const routes = [
    {
      to: "/problems",
      name: "Problems",
    },
    {
      to: "/contest",
      name: "Contest",
    },
    {
      to: "/rank",
      name: "Rank",
    },
    {
      to: "/example",
      name: "Example",
    },
  ];

  return (
    <div className="header">
      <Fragment>
        <div className="header__logo">
          <Link to={"/"}>
            <img
              src="https://plainenglish.io/assets/post-content/capture-images-via-webcam-using-react.png"
              alt=""
            />
          </Link>
        </div>
        <div className="header__menu">
          {routes.map((item, idx) => (
            <div className="header__menu-item" key={idx}>
              <Link to={`${item.to}`}>{item.name}</Link>
            </div>
          ))}
        </div>
      </Fragment>
      <div className="header__auth">
        <div className="header__auth-item">
          <Link to='/login'>Login</Link>
        </div>
        <div className="header__auth-item">Sign in</div>
      </div>
    </div>
  );
};

export default Header;
