import React, { useState } from 'react';
import './LoginPage.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from './logo.png';  // Import the logo image


function LoginPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5002/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      if (!response.ok) {
        if (response.status === 401) {
          console.log('Login Failed: Invalid Credentials')
          alert('Invalid Credentials')
        } else {
          console.log(`HTTP ERROR: ${response.status}`)
        }
        return
      }



      const result = await response.json();
      if (result.success) {
        console.log('Login Successful');
        navigate('/dashboard')
      } else {
        console.log('Login Failed');
      }
    }
    catch (err) {
      console.error('Error during login:', err);
      console.log('Login Failed: Unable to connect to the server.');
    }
  }

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}> {/* Action should ideally be replaced by React Router for navigation */}
        <div className="header">
          {/* Logo */}
          <img src={logo} alt="Stock Dash Logo" className="logo" />
          <h2>Stock Dash</h2>
          <h3>All your stocks in one place.</h3>
        </div>

        {/* Login form */}
        <form action="/register">
          <div className="input-field">
            <input
              type="text"
              name="email"
              onChange={handleChange}
              required
              value={formData.email}
            />
            <label>Enter your email</label>
          </div>

          <div className="input-field">
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
              value={formData.password}
            />
            <label>Enter your password</label>
          </div>


          {/* Login button */}
          <button type="submit">Log In</button>

          <div className="register">
            <p>
              Don't have an account? <Link to="/">Register</Link>
            </p>
          </div>
        </form>
    </div >
  );
}

export default LoginPage;
