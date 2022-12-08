import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import authService from "../../apis/auth/auth.service";
import "./style.css";
const Signup = () => {
  const navigate = useNavigate();
  const [valueRequest, setValueRequest] = useState({
    username: "",
    password: "",
    gender: "",
    fullName: "",
    birthday: "",
  });

  const handleRegister = (event) => {
    event.preventDefault();
    authService.signUp(valueRequest).then((res) => {
      if (res) {
        toast.success("Signup success");
        navigate("/login");
      }
    });
  };

  return (
    <div class="main-login">
      <div className="center">
        <h1>Sign Up</h1>
        <form onSubmit={handleRegister}>
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
          <div className="txt_field">
            <input
              type="text"
              required
              value={valueRequest.fullName}
              onChange={(e) =>
                setValueRequest({
                  ...valueRequest,
                  fullName: e.target.value,
                })
              }
            />
            <span></span>
            <label>FullName</label>
          </div>
          <div className="txt_field">
            <input
              type="text"
              required
              value={valueRequest.birthday}
              onChange={(e) =>
                setValueRequest({
                  ...valueRequest,
                  birthday: e.target.value,
                })
              }
            />
            <span></span>
            <label>Birthday</label>
          </div>
          <div className="txt_field">
            <input
              type="text"
              required
              value={valueRequest.gender}
              onChange={(e) =>
                setValueRequest({
                  ...valueRequest,
                  gender: e.target.value,
                })
              }
            />
            <span></span>
            <label>Gender</label>
          </div>
          <div className="pass">Forgot Password?</div>
          <input type="submit" value="Login" />
          <div className="signup_link">
            Not a member? <a href="/login">Signup</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
