import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import authService from "../../apis/auth/auth.service";
import AuthContext from "../../context/AuthProvider";
import "./style.css";
const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [valueRequest, setValueRequest] = useState({
    username: "",
    password: "",
  });

  const handleLogin = (event) => {
    event.preventDefault();
    authService.login(valueRequest).then((res) => {
      if (res) {
        setAuth(res.data.jwt);
        localStorage.setItem("accessToken", res.data.jwt);
        localStorage.setItem("userId", res.data.userId);
        if (res.data.role === "ROLE_ADMIN") {
          toast.success('Login success')
          navigate("/admin");
        } else {
          toast.success('Login success')
          navigate("/");
        }
      }
    }, err => {
      toast.error('account password is incorrect')
    });
  };

  return (
    <div className="main-login">
      <div className="center">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className="txt_field">
            <input
              type="text"
              required
              value={valueRequest.username}
              onChange={(e) =>
                setValueRequest({
                  ...valueRequest,
                  username: e.target.value,
                })
              }
            />
            <span></span>
            <label>Username</label>
          </div>
          <div className="txt_field">
            <input
              type="password"
              required
              value={valueRequest.password}
              onChange={(e) =>
                setValueRequest({
                  ...valueRequest,
                  password: e.target.value,
                })
              }
            />
            <span></span>
            <label>Password</label>
          </div>
          <div className="pass">Forgot Password?</div>
          <input type="submit" value="Login" />
          <div className="signup_link">
            Not a member? <a href="/sign-up">Signup</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
