import axios from "axios";

const API_URL = "http://localhost:5000/api";

const visitorService = {
  // Create new visitor
  async createVisitor(visitorData) {
    try {
      const response = await axios.post(`${API_URL}/visitors`, visitorData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all visitors
  async getVisitors() {
    try {
      const response = await axios.get(`${API_URL}/visitors`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get active visitors
  async getActiveVisitors() {
    try {
      const response = await axios.get(`${API_URL}/visitors/active`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Check out visitor
  async checkoutVisitor(visitorId) {
    try {
      const response = await axios.put(
        `${API_URL}/visitors/${visitorId}/checkout`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Submit visitor feedback
  async submitFeedback(visitorId, feedbackData) {
    try {
      const response = await axios.put(
        `${API_URL}/visitors/${visitorId}/feedback`,
        feedbackData
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default visitorService;
