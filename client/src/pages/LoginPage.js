import React from 'react';
import './LoginPage.css';
import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <div className="wrapper">
      <form action="/register"> {/* Action should ideally be replaced by React Router for navigation */}
        <h2>Stock Dash</h2>
        <h3>All your stocks in one place.</h3>

        {/* Email input field */}
        <div className="input-field">
          <input type="text" required />
          <label>Enter your email</label>
        </div>

        {/* Password input field */}
        <div className="input-field">
          <input type="password" required />
          <label>Enter your password</label>
        </div>


        {/* Login button */}
        <button type="submit">Log In</button>

        {/* Register link (using React Router's Link component) */}
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
