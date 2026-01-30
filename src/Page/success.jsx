import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Success() {
    const navigate = useNavigate();
      useEffect(() => {
    // 🔥 CART RESET AFTER PAYMENT
    localStorage.removeItem("cartCount");
  }, []);
  return (
    <div className="success-container">
      <div className="success-card">
        <div className="checkmark-circle">
          <div className="checkmark"></div>
        </div>

        <h2>Payment Successful 🎉</h2>
        <p>Your order has been placed successfully.</p>

        <button onClick={() => navigate ("/home")}>
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default Success