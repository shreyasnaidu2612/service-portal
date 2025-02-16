import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";
import logo from "../assets/logo.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [requests, setRequests] = useState([]);
  const [newRequest, setNewRequest] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [theme, setTheme] = useState("Light");
  const [filter, setFilter] = useState("All");
  const [requestSuggestions] = useState([
    "System Upgrade",
    "Internet Connectivity",
    "Printer Issue",
    "Software Installation",
    "Network Downtime",
    "Technical Glitch",
  ]);
  const [notifications, setNotifications] = useState(true);

  // ✅ Get user role from localStorage
  const role = localStorage.getItem("role");

  // ✅ Fetch requests from MongoDB when component loads
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/requests");
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const handleSidebarClick = (section) => setActiveSection(section);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  // ✅ Save new request to MongoDB
  const handleAddRequest = async () => {
    if (newRequest.trim() !== "") {
      const newReq = {
        title: newRequest,
        status: "Pending",
        date: new Date().toISOString().split("T")[0],
        screenshot,
      };

      try {
        const response = await axios.post("http://localhost:5000/requests", newReq);
        setRequests([...requests, response.data]);
        setNewRequest("");
        setScreenshot(null);
      } catch (error) {
        console.error("Error adding request:", error);
      }
    }
  };

  // ✅ Update request status in MongoDB when admin resolves it
  const handleResolveRequest = async (id) => {
    const description = prompt("Please enter a resolution description:");
    if (description) {
      try {
        await axios.put(`http://localhost:5000/requests/${id}`, {
          status: "Resolved",
          description,
          date: new Date().toISOString().split("T")[0],
        });

        setRequests(
          requests.map((req) =>
            req._id === id ? { ...req, status: "Resolved", description } : req
          )
        );
      } catch (error) {
        console.error("Error resolving request:", error);
      }
    }
  };

  const handleFilterChange = (status) => setFilter(status);
  const handleThemeChange = (newTheme) => setTheme(newTheme);

  const handleScreenshotUpload = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg")) {
      const reader = new FileReader();
      reader.onload = (e) => setScreenshot(e.target.result);
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image (JPG, JPEG, PNG)");
    }
  };

  const filteredRequests = requests.filter((req) => filter === "All" || req.status === filter);

  return (
    <div className={`dashboard-container ${theme.toLowerCase()}-theme`}>
      <div className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="Service Portal Logo" className="logo" />
        </div>
        <ul>
          <li className={activeSection === "Dashboard" ? "active" : ""} onClick={() => handleSidebarClick("Dashboard")}>
            Dashboard
          </li>
          <li className={activeSection === "Requests" ? "active" : ""} onClick={() => handleSidebarClick("Requests")}>
            Requests
          </li>
          <li className={activeSection === "Reports" ? "active" : ""} onClick={() => handleSidebarClick("Reports")}>
            Reports
          </li>
          <li className={activeSection === "Settings" ? "active" : ""} onClick={() => handleSidebarClick("Settings")}>
            Settings
          </li>
        </ul>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="main-content">
        {activeSection === "Dashboard" && (
          <>
            <h1>Dashboard</h1>
            <div className="dashboard-analytics">
              <div className="analytics-card total">
                <h3>Total Requests</h3>
                <p>{requests.length}</p>
              </div>
              <div className="analytics-card pending">
                <h3>Pending Requests</h3>
                <p>{requests.filter((req) => req.status === "Pending").length}</p>
              </div>
              <div className="analytics-card resolved">
                <h3>Resolved Requests</h3>
                <p>{requests.filter((req) => req.status === "Resolved").length}</p>
              </div>
            </div>
          </>
        )}
        {activeSection === "Requests" && (
          <>
            <h1>Requests</h1>
            <div className="filter-section">
              <input type="text" placeholder="Enter a new request" value={newRequest} onChange={(e) => setNewRequest(e.target.value)} className="input-field" />
              <input type="file" accept=".jpg,.jpeg,.png" onChange={handleScreenshotUpload} className="file-upload" />
              <button onClick={handleAddRequest} className="primary-button">
                Add Request
              </button>
              <select onChange={(e) => handleFilterChange(e.target.value)} className="filter-dropdown">
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Resolved">Resolved</option>
                <option value="In Progress">In Progress</option>
              </select>
            </div>
            <div className="requests-table">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Screenshot</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((req) => (
                    <tr key={req._id}>
                      <td>{req.title}</td>
                      <td>{req.status}</td>
                      <td>{req.date}</td>
                      <td>{req.screenshot ? <img src={req.screenshot} alt="Screenshot" /> : "No Screenshot"}</td>
                      <td>{role === "admin" && req.status === "Pending" && <button onClick={() => handleResolveRequest(req._id)}>Resolve</button>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        {activeSection === "Reports" && (
          <>
            <h1>Reports</h1>
            <div className="timeline">
              {requests.filter((req) => req.status === "Resolved").map((req) => (
                <div key={req._id} className="timeline-item">
                  <h3>{req.title}</h3>
                  <p>Resolved on: {req.date}</p>
                  <p>Description: {req.description}</p>
                </div>
              ))}
            </div>
          </>
        )}
        {activeSection === "Settings" && (
          <>
            <h1>Settings</h1>
            <div className="settings-content">
              <h3>Theme Selection</h3>
              <button onClick={() => handleThemeChange("Light")}>🌞 Light</button>
              <button onClick={() => handleThemeChange("Dark")}>🌙 Dark</button>
              <h3>Notifications</h3>
              <div className="notification-toggle">
                <label className="switch">
                  <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} />
                  <span className="slider round"></span>
                </label>
                <span>{notifications ? "🔔 Enabled" : "🔕 Disabled"}</span>
              </div>
              <h3>Profile Settings</h3>
              <button>Update Profile</button>
              <button>Change Password</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
