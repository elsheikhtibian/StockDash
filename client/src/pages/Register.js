// src/pages/RegisterPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css'; // Make sure this path is correct or adjust it based on your structure

function RegisterPage() {
  return (
    <div className="wrapper">
      <form action="/dashboard/index.html" method="POST">
        <h2>Register</h2>
        <h3>Join Stock Dash</h3>
        
        <div className="input-field">
          <input type="text" name="first_name" required />
          <label>First Name</label>
        </div>

        <div className="input-field">
          <input type="text" name="last_name" required />
          <label>Last Name</label>
        </div>

        <div className="input-field">
          <input type="email" name="email" required />
          <label>Enter your email</label>
        </div>

        <div className="input-field">
          <input type="password" name="password" required />
          <label>Enter your password</label>
        </div>

        <div className="input-field">
          <input type="password" name="confirm_password" required />
          <label>Re-enter your password</label>
        </div>

        <div className="input-field">
          <select name="security_question" required>
            <option value="first_pet">What was the name of your first pet?</option>
            <option value="mother_maiden">What is your mother's maiden name?</option>
            <option value="city_of_birth">What city were you born in?</option>
          </select>
          <label>Security Question</label>
        </div>

        <div className="input-field">
          <input type="text" name="security_answer" required />
          <label>Security Answer</label>
        </div>

        <button type="submit">Register</button>

        <div className="register">
          <p>Already have an account? <Link to="/">Login</Link></p>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
