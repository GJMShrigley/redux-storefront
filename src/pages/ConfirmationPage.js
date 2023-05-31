import "../message.css";
import React from "react";
import { Link } from "react-router-dom";

function ConfirmationPage() {
  return (
    <div className="message-page">
      <div className="message__container">
        <h1 className="message__title">THANK YOU FOR PLACING YOUR ORDER</h1>
        <h2 className="message__subtitle">YOUR ITEMS WILL BE WITH YOU SOON</h2>
        <Link to="/" className="link__home button">
        RETURN HOME
      </Link>
      </div>
    </div>
  );
}

export default ConfirmationPage;
