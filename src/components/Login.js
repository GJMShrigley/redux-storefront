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
    <div className="login-page">
      <div className="login__form-wrapper">
        <form className="login__form" onSubmit={handleSubmit}>
          <h1 className="login__title">Login</h1>
          <div className="login__form-element-container">
            <label className="login__label" htmlFor="id">
              Username&#58;&#32;
            </label>
            <input
              className="login__input"
              type="text"
              name="id"
              id="id"
              placeholder="enter your username"
            />
          </div>
          <div className="login__form-element-container">
            <label className="login__label" htmlFor="password">
              Password&#58;&#32;
            </label>
            <input
              className="login__input"
              type="password"
              name="password"
              id="password"
              placeholder="enter your password"
            />
          </div>
          <button className="login__btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
