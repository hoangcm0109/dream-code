import React, { Fragment, useContext } from "react";
import toast from "react-hot-toast";
import { Link, redirect } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
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
  const { auth, setAuth } = useContext(AuthContext);
  const accessToken = localStorage.getItem('accessToken')

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    setAuth("")
    redirect('/login')
    toast.success('Logout web')
  }

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
        {auth || accessToken ? (
          <>
            <div className="header__auth-item">Welcome to!</div>
            <div className="header__auth-item" onClick={handleLogout}>Logout</div>
          </>
        ) : (
          <>
            <div className="header__auth-item">
              <Link to="/login">Login</Link>
            </div>
            <div className="header__auth-item">Sign in</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
