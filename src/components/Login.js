import React from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
import "../login.css";

const Login = () => {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authActions.login());
  };

  return (
    <div className="login-screen">
      <div className="login-form-wrapper">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="login-title">Login</h1>
          <div className="login-form-element-container">
            <label className="login-label" htmlFor="id">
              Username&#58;&#32;
            </label>
            <input
              className="login-input"
              type="text"
              name="id"
              id="id"
              placeholder="enter your username"
            />
          </div>
          <div className="login-form-element-container">
            <label className="login-label" htmlFor="password">
              Password&#58;&#32;
            </label>
            <input
              className="login-input"
              type="password"
              name="password"
              id="password"
              placeholder="enter your password"
            />
          </div>
          <button className="login-btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
