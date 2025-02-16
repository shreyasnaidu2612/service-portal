import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/admin" element={<Dashboard role="admin" />} />
        <Route path="/dashboard/user" element={<Dashboard role="user" />} />
        <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unknown routes to login */}
      </Routes>
    </Router>
  );
}

export default App;
