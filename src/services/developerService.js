import api from "./api";

const developerService = {
  // Get all developers with optional filters
  getAllDevelopers: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append("search", filters.search);
      if (filters.skills) params.append("skills", filters.skills);

      const response = await api.get(`/developers?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get developer by ID
  getDeveloperById: async (id) => {
    try {
      const response = await api.get(`/developers/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update developer profile
  updateProfile: async (profileData) => {
    try {
      const response = await api.put("/developers/profile", profileData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Send connection request
  sendConnectionRequest: async (developerId, message) => {
    try {
      const response = await api.post("/developers/connect", {
        developerId,
        message,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get connection requests (received)
  getReceivedRequests: async () => {
    try {
      const response = await api.get("/developers/requests/received");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get connection requests (sent)
  getSentRequests: async () => {
    try {
      const response = await api.get("/developers/requests/sent");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Accept connection request
  acceptRequest: async (requestId) => {
    try {
      const response = await api.put(
        `/developers/requests/${requestId}/accept`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Decline connection request
  declineRequest: async (requestId) => {
    try {
      const response = await api.put(
        `/developers/requests/${requestId}/decline`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get user's connections
  getConnections: async () => {
    try {
      const response = await api.get("/developers/connections");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Search developers by skill
  searchBySkill: async (skill) => {
    try {
      const response = await api.get(`/developers/search?skill=${skill}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default developerService;
