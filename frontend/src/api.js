import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

// ✅ Fetch all requests (Admin View)
export const getRequests = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/requests`);
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching requests:", error);
        return [];
    }
};

// ✅ Post a new request (User)
export const createRequest = async (requestData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/requests`, requestData);
        return response.data;
    } catch (error) {
        console.error("❌ Error creating request:", error);
    }
};

// ✅ Resolve a request (Admin)
export const resolveRequest = async (id, description) => {
    try {
        await axios.put(`${API_BASE_URL}/requests/${id}`, { status: "Resolved", description });
    } catch (error) {
        console.error("❌ Error resolving request:", error);
    }
};
