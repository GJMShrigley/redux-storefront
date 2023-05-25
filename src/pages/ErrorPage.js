import React from "react";
import { Link } from "react-router-dom";
import "../errorPage.css";

function ErrorPage() {
  return (
      <div className="error-page">
        <div className="error-page-container">
          <h1 className="error-page-title">THE PAGE YOU ARE LOOKING FOR DOES NOT EXIST</h1>
          <Link to="/" className="link-home button">
            RETURN HOME
          </Link>
        </div>
      </div>
  );
}

export default ErrorPage;
