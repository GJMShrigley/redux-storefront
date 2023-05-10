import "../App.css";
import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div>
      <div className="error-page">THERE HAS BEEN AN ERROR</div>
      <Link to="/" className="link-home">
        RETURN HOME
      </Link>
    </div>
  );
}

export default ErrorPage;