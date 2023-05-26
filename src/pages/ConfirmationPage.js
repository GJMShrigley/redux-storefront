import "../confirmation.css";
import React from "react";
import { Link } from "react-router-dom";

function ConfirmationPage() {
  return (
    <div className="confirmation-page">
      <div className="confirmation__container">
        <h1 className="confirmation__title">THANK YOU FOR PLACING YOUR ORDER</h1>
        <h2 className="confirmation__subtitle">YOUR ITEMS WILL BE WITH YOU SOON</h2>
        <Link to="/" className="link__home button">
        RETURN HOME
      </Link>
      </div>
    </div>
  );
}

export default ConfirmationPage;
