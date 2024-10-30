// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login';
import CreateAccountPage from './components/CreateAccount';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import StockDashboard from "./components/StockDashboard";

function App() {
  return (
    <Router>
      <app className="App">
        <Routes>
          <Route path="/3000/login" element={<LoginPage />} />
          <Route path="/3000/create-account" element={<CreateAccountPage />} />
        </Routes>
        <StockDashboard />
      </app>
    </Router>
  );
}

export default App;
