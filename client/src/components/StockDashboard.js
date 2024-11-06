// src/StockDashboard.js

import React from "react";
import "./StockDashboard.css"; // Create this CSS file for styling

function StockDashboard() {
  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <header className="dashboard-header">
        <h1>My Stocks</h1>
        <div className="menu-icon">
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </header>

      {/* Stock Display Box */}
      <div className="stocks-box">
        <p>Your stock information will appear here.</p>
        {/* Add more elements here to display stock data dynamically */}
      </div>
    </div>
  );
}

export default StockDashboard;
