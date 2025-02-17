# 🚀 Service Portal - Full Stack Application

A full-stack service portal to handle IT requests, built with **Node.js + Express + MongoDB** for the backend and **React.js** for the frontend.

## ✅ Features
- ✅ **User-friendly IT Request Management System**
- ✅ **Role-based Access** – Users can submit requests, Admins can resolve them
- ✅ **MongoDB Database** to store requests and user data
- ✅ **Dark & Light Theme Support**
- ✅ **Real-time Notifications & Profile Settings**
- ✅ **Admin Dashboard** to manage requests

---

## 🛠️ Technologies Used
- **Frontend:** React.js, CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Database:** MongoDB (Atlas or Local)
- **Authentication:** Role-based authentication (User/Admin)
- **Deployment:** Frontend (Netlify/Vercel), Backend (Render/Heroku)

---

## ⚙️ Installation Guide

### 🏁 1️⃣ Clone the Repository
First, clone this repository:

```bash
git clone https://github.com/yourusername/service-portal.git
cd service-portal
```
# 📌 Backend Setup (Node.js & MongoDB)

## 🔹 2️⃣ Navigate to Backend & Install Dependencies
```bash
cd backend
npm install
```

## 🔹 3️⃣ MongoDB Setup
### Option 1: Use Local MongoDB
1. Install MongoDB from [here](https://www.mongodb.com/try/download/community).
2. Start MongoDB:
   ```bash
   mongod --dbpath=data
   ```
3. Create a Database:
   ```bash
   mongo
   use service_portal_db
   ```

### Option 2: Use MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a Cluster and click **Connect**.
3. Select **"Connect your application"** and copy the connection string.
4. Replace `<yourpassword>` with your actual password in the `.env` file:
   ```ini
   MONGO_URI=mongodb+srv://yourusername:yourpassword@cluster0.mongodb.net/?retryWrites=true&w=majority
   PORT=5000
   ```

## 🔹 4️⃣ Start the Backend Server
```bash
node server.js
```
✅ The server will start on: [http://localhost:5000](http://localhost:5000)  
✅ API Endpoints available at: [http://localhost:5000/requests](http://localhost:5000/requests)

---

# 🎨 Frontend Setup (React.js)

## 🔹 5️⃣ Navigate to Frontend & Install Dependencies
```bash
cd ../frontend
npm install
```

## 🔹 6️⃣ Configure API Base URL
Open `frontend/src/api.js` and update the backend URL:
```js
const API_BASE_URL = "http://localhost:5000";
```
➡️ (Change this to deployed backend URL in production)

## 🔹 7️⃣ Start the Frontend
```bash
npm start
```
✅ The frontend will be available at: [http://localhost:3000](http://localhost:3000)

---

# 👤 Login Credentials

| Role  | Email               | Password  |
|-------|---------------------|----------|
| Admin | admin@example.com  | admin123 |
| User  | user@example.com   | user123  |

## 🚀 Live Demo
🔗 **Frontend:** --> https://service-portal-shreyasnaidu2612-shreyas-naidus-projects.vercel.app <--  
🔗 **Backend API:** --> https://service-portal-9yzd.onrender.com <--

