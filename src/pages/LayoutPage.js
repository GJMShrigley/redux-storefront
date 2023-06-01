import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice"
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Login from "../components/Login";

function LayoutPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  // on first render, check sessionStorage to see if the user has logged in this browser session and set the local 'isLoggedIn' State accordingly
  useEffect(() => {
    const value = sessionStorage.getItem("login");
    let boolean = value === "true";
    setIsLoggedIn(boolean)
  }, [])

  // set both the local and global 'isLoggedIn' States to true 
  function loginHandler() {
    setIsLoggedIn(true);
    dispatch(authActions.login());
  }

  // set both the local and global 'isLoggedIn' States to false  
  function logoutHandler() {
    setIsLoggedIn(false);
    dispatch(authActions.logout());
  }

  //render the store/cart/message display if the local 'isLoggedIn' State is true, otherwise render the login page 
  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} logoutHandler={logoutHandler} />
      <Navbar />
      {isLoggedIn === true ? <Outlet /> : <Login loginHandler={loginHandler} />}
    </div>
  );
}

export default LayoutPage;
