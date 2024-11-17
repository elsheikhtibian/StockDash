import React from 'react';
import './LoginPage.css';
import { Link } from 'react-router-dom';
import logo from './logo.png';  // Import the logo image

function LoginPage() {
  return (
    <div className="wrapper">
      <div className="header">
        {/* Logo */}
        <img src={logo} alt="Stock Dash Logo" className="logo" />

        {/* Title and subtitle */}
        <h2>Stock Dash</h2>
        <h3>All your stocks in one place.</h3>
      </div>

      {/* Login form */}
      <form action="/register"> 
        <div className="input-field">
          <input type="text" required />
          <label>Enter your email</label>
        </div>

        <div className="input-field">
          <input type="password" required />
          <label>Enter your password</label>
        </div>

        <button type="submit">Log In</button>

        <div className="register">
          <p>
            Don't have an account? <Link to="/">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
