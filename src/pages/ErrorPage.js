import React from "react";
import { Link } from "react-router-dom";
import "../message.css";

function ErrorPage() {
  return (
      <div className="error-page">
        <div className="error-page__container">
          <h1 className="error-page__title">THE PAGE YOU ARE LOOKING FOR DOES NOT EXIST</h1>
          <Link to="/" className="link__home button">
            RETURN HOME
          </Link>
        </div>
      </div>
  );
}

export default ErrorPage;
