🚀 Service Portal - Full Stack Application
A full-stack service portal to handle IT requests, built with Node.js + Express + MongoDB for the backend and React.js for the frontend.

📌 Features
✅ User-friendly IT Request Management System
✅ Role-based Access – Users can submit requests, Admins can resolve them
✅ MongoDB Database to store requests and user data
✅ Dark & Light Theme Support
✅ Real-time Notifications & Profile Settings
✅ Admin Dashboard to manage requests

📌 Technologies Used
Frontend: React.js, CSS
Backend: Node.js, Express.js, MongoDB
Database: MongoDB (Atlas or Local)
Authentication: Role-based authentication (User/Admin)
Deployment: Frontend (Netlify/Vercel), Backend (Render/Heroku)

🛠️ Installation Guide
1️⃣ Clone the Repository
First, clone this repository:

bash
Copy
Edit
git clone https://github.com/yourusername/service-portal.git
cd service-portal
🚀 Backend Setup (Node.js & MongoDB)
2️⃣ Navigate to Backend & Install Dependencies
bash
Copy
Edit
cd backend
npm install
3️⃣ MongoDB Setup
🟢 Option 1: Use Local MongoDB
Install MongoDB from here.
Start MongoDB:
bash
Copy
Edit
mongod --dbpath=data
Create a Database:
Open MongoDB Compass or run:
bash
Copy
Edit
mongo
use service_portal_db
🔵 Option 2: Use MongoDB Atlas (Cloud)
Create a free account at MongoDB Atlas.
Create a cluster, click Connect, and select "Connect your application".
Copy the connection string (Replace <password> with your password):
ruby
Copy
Edit
mongodb+srv://yourusername:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority
4️⃣ Configure Backend .env File
Create a .env file inside the backend/ folder:

ini
Copy
Edit
MONGO_URI=mongodb+srv://yourusername:yourpassword@cluster0.mongodb.net/?retryWrites=true&w=majority
PORT=5000
5️⃣ Start the Backend Server
bash
Copy
Edit
node server.js
✅ The server will start on http://localhost:5000
✅ API Endpoints will be available at http://localhost:5000/requests

🎨 Frontend Setup (React.js)
6️⃣ Navigate to Frontend & Install Dependencies
bash
Copy
Edit
cd ../frontend
npm install
7️⃣ Configure API Base URL
Open frontend/src/api.js and update the backend URL:
js
Copy
Edit
const API_BASE_URL = "http://localhost:5000";  // Change this to deployed URL in production
8️⃣ Start the Frontend
bash
Copy
Edit
npm start
✅ The frontend will be available at http://localhost:3000
✅ Login with:

Admin: admin@example.com / admin123
User: user@example.com / user123
📌 Deployment Guide
🔵 Deploy Backend (Node.js + MongoDB)
Option 1: Deploy on Render
Sign up at Render.
Create a new web service.
Connect to your GitHub repository.
Set the environment variables (MONGO_URI, PORT).
Click Deploy.
Option 2: Deploy on Heroku
bash
Copy
Edit
heroku create service-portal-backend
heroku config:set MONGO_URI=your_connection_string
git push heroku main
🟢 Deploy Frontend (React.js)
Option 1: Deploy on Netlify
Sign up at Netlify.
Connect to your GitHub repository.
Set the backend URL in frontend/src/api.js to the deployed backend.
Click Deploy.
Option 2: Deploy on Vercel
bash
Copy
Edit
npm install -g vercel
vercel
🛠 API Endpoints
Method	Endpoint	Description
GET	/requests	Get all requests (Admin only)
POST	/requests	Create a new request (User)
PUT	/requests/:id	Resolve a request (Admin)
🎯 Future Enhancements
✅ Add JWT authentication
✅ Implement Email notifications
✅ Advanced role-based access control

🚀 Your Project is Ready to Use!
