import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RegisterPage.css'; // Make sure this path is correct or adjust it based on your structure
import logo from './logo.png'; // Import the logo image

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    security_question: '',
    security_answer: ''
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

    if (formData.password !== formData.confirm_password) {
      alert('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5002/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        alert('Registration Successful');
        navigate('/dashboard');
      } else {
        alert('Registration Failed');
      }
    } catch (error) {
      console.error('Error occurred', error);
      alert('An error occurred, try again');
    }
  };

  return (
    <div className="wrapper">
      {/* Add Logo at the top */}
      <div className="logo-container">
        <img src={logo} alt="Stock Dash Logo" className="logo" />
      </div>

      <form onSubmit={handleSubmit} method="POST">
        <h2>Register</h2>
        <h3>Join Stock Dash</h3>

        <div className="input-field">
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
          <label>First Name</label>
        </div>

        <div className="input-field">
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
          <label>Last Name</label>
        </div>

        <div className="input-field">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Enter your email</label>
        </div>

        <div className="input-field">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label>Enter your password</label>
        </div>

        <div className="input-field">
          <input
            type="password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            required
          />
          <label>Re-enter your password</label>
        </div>

        <div className="input-field">
          <select
            name="security_question"
            value={formData.security_question}
            onChange={handleChange}
            required
          >
            <option value="first_pet">What was the name of your first pet?</option>
            <option value="mother_maiden">What is your mother's maiden name?</option>
            <option value="city_of_birth">What city were you born in?</option>
          </select>
          <label>Security Question</label>
        </div>

        <div className="input-field">
          <input
            type="text"
            name="security_answer"
            value={formData.security_answer}
            onChange={handleChange}
            required
          />
          <label>Security Answer</label>
        </div>

        <button type="submit">Register</button>

        <div className="register">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
