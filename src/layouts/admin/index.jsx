import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./style.css";
const AdminPage = () => {
  const { pathname } = useLocation();
  const arrMenu = [
    {
      label: "Problem",
      path: "/admin/problem",
    },
    {
      label: "Contest",
      path: "/admin/contest",
    },
    {
      label: "Test Case",
      path: "/admin/testcase",
    },
    {
      label: "User",
      path: "/admin/user",
    }
  ];
  return (
    <div className="admin">
      <div className="menu">
        <div className="search_input">
          <h1>Admin Compiler Code</h1>
          <input type="text" placeholder="Search..." />
        </div>
        {arrMenu.map((item, idx) => (
          <div
            key={idx}
            className={`menu_item ${
              pathname.indexOf(item.path) > -1 ? "active" : ""
            }`}
          >
            <Link to={item.path}>{item.label}</Link>
          </div>
        ))}
        <div className="menu_footer">
          <Link to={"/"}>Go home</Link>
        </div>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPage;
