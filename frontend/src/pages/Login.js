import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Hardcoded credentials for demo
  const validUsers = [
    { email: "admin@example.com", password: "admin123", role: "admin" },
    { email: "user@example.com", password: "user123", role: "user" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate credentials
    const user = validUsers.find((u) => u.email === email && u.password === password);

    if (user) {
      // Store token and role in localStorage for session management
      localStorage.setItem("token", "mock-token");
      localStorage.setItem("role", user.role);

      // Navigate based on role
      navigate(user.role === "admin" ? "/dashboard/admin" : "/dashboard/user");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Service Portal</h1>
        {error && <p className="error-message">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p className="forgot-password">Forgot Password?</p>
      </form>
    </div>
  );
};

export default Login;
