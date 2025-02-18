const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Define Request Schema
const requestSchema = new mongoose.Schema({
  title: String,
  status: { type: String, default: "Pending" },
  date: { type: String, default: new Date().toISOString().split("T")[0] },
  description: { type: String, default: "" },
  screenshot: { type: String, default: null },
});

const Request = mongoose.model("Request", requestSchema);

// ✅ Fetch all requests (Admin View)
app.get("/requests", async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch requests" });
  }
});

// ✅ Fetch only resolved requests
app.get("/requests/resolved", async (req, res) => {
  try {
    const resolvedRequests = await Request.find({ status: "Resolved" });
    res.json(resolvedRequests);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch resolved requests" });
  }
});

// ✅ Create a new request (User)
app.post("/requests", async (req, res) => {
  try {
    const { title, screenshot } = req.body;
    const newRequest = new Request({ title, screenshot: screenshot || null });
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ error: "Failed to create request" });
  }
});

// ✅ Update request status to resolved (Admin)
app.put("/requests/:id", async (req, res) => {
  try {
    const { status, description } = req.body;
    const updatedRequest = await Request.findByIdAndUpdate(
      req.params.id,
      { status, description, date: new Date().toISOString().split("T")[0] },
      { new: true }
    );
    if (!updatedRequest) return res.status(404).json({ error: "Request not found" });
    res.json({ message: "Request updated successfully.", updatedRequest });
  } catch (error) {
    res.status(500).json({ error: "Failed to update request" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
// ✅ Default route to confirm server is running
app.get("/", (req, res) => {
  res.send("✅ Backend is running!");
});

});
