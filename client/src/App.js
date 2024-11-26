import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/Register'; // Your register page component
import Portfolio from './pages/Portfolio';
import Watchlist from './pages/Watchlist';
import Dashboard from './pages/Dashboard';
import Navbar from "./Navbar"

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </div>
    </>
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<RegisterPage />} />

    //     <Route path="/login" element={<LoginPage />} />
    //   </Routes>
    // </Router>
  );
}

export default App;
