import api from "./api";

const authService = {
  // Initiate Google OAuth login
  // In production, this redirects to backend OAuth endpoint
  initiateGoogleLogin: () => {
    // For production: redirect to your backend OAuth endpoint
    // window.location.href = `${API_BASE_URL}/auth/google`;

    // For development: simulate OAuth flow
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockResponse = {
          token: "mock-jwt-token-" + Date.now(),
          user: {
            id: Math.random().toString(36).substring(7),
            name: "John Doe",
            email: "john@example.com",
            avatar: "https://i.pravatar.cc/150?img=33",
            skills: ["JavaScript", "React", "Node.js"],
            bio: "Passionate developer building amazing web applications",
            github: "https://github.com/johndoe",
            linkedin: "https://linkedin.com/in/johndoe",
            portfolio: "https://johndoe.dev",
          },
        };
        resolve(mockResponse);
      }, 1000);
    });
  },

  // Handle OAuth callback
  // This would be called on the callback route with the code parameter
  handleOAuthCallback: async (code) => {
    try {
      const response = await api.post("/auth/google/callback", { code });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Logout
  logout: async () => {
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (error) {
      // Even if API call fails, clear local data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      throw error;
    }
  },

  // Get current user profile
  getCurrentUser: async () => {
    try {
      const response = await api.get("/auth/me");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Refresh token
  refreshToken: async () => {
    try {
      const response = await api.post("/auth/refresh");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default authService;
