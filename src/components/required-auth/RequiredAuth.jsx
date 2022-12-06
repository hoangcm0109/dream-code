import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";

const RequiredAuth = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const accessToken = localStorage.getItem('accessToken')
  return (
    <div>
      {auth || accessToken ? <div>{children}</div> : <Navigate to="/login" replace={true} />}
    </div>
  );
};

export default RequiredAuth;
