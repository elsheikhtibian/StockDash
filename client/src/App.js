import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/Register'; // Your register page component

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<RegisterPage />} />

        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
