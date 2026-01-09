import React from 'react'
import { useNavigate } from 'react-router-dom';

function Cancel() {
    const navigate = useNavigate();
  return (
    <div className="cancel-container">
      <div className="cancel-card">
        <div className="cross-circle">
          <div className="cross left"></div>
          <div className="cross right"></div>
        </div>

        <h2>Payment Failed ❌</h2>
        <p>Your payment was cancelled or failed. Please try again.</p>

        <button onClick={() => navigate("/cart")}>
          Try Again
        </button>
      </div>
    </div>
  );
}

export default Cancel