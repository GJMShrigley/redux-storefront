import "../App.css";
import React from "react";
import { Link } from 'react-router-dom';

function ConfirmationPage() {
  return (
    <div>
      <div className="confirmation-page">THANK YOU FOR PLACING YOUR ORDER</div>
      <Link to="/" className="link-home">
        RETURN HOME
      </Link>
    </div>
  );
}

export default ConfirmationPage;
