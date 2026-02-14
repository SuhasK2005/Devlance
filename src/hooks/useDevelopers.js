import { useState, useEffect } from "react";
import developerService from "../services/developerService";

/**
 * Custom hook to fetch and manage developers list
 * @param {Object} filters - Filter options (search, skills)
 * @returns {Object} - { developers, loading, error, refetch }
 */
export const useDevelopers = (filters = {}) => {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDevelopers = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await developerService.getAllDevelopers(filters);
      setDevelopers(data);
    } catch (err) {
      setError(err.message || "Failed to fetch developers");
      console.error("Error fetching developers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevelopers();
  }, [JSON.stringify(filters)]);

  return {
    developers,
    loading,
    error,
    refetch: fetchDevelopers,
  };
};

/**
 * Custom hook to manage connection requests
 * @returns {Object} - Functions and state for managing requests
 */
export const useConnectionRequests = () => {
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReceivedRequests = async () => {
    try {
      const data = await developerService.getReceivedRequests();
      setReceivedRequests(data);
    } catch (err) {
      console.error("Error fetching received requests:", err);
      throw err;
    }
  };

  const fetchSentRequests = async () => {
    try {
      const data = await developerService.getSentRequests();
      setSentRequests(data);
    } catch (err) {
      console.error("Error fetching sent requests:", err);
      throw err;
    }
  };

  const fetchAllRequests = async () => {
    setLoading(true);
    setError(null);

    try {
      await Promise.all([fetchReceivedRequests(), fetchSentRequests()]);
    } catch (err) {
      setError(err.message || "Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllRequests();
  }, []);

  const acceptRequest = async (requestId) => {
    try {
      await developerService.acceptRequest(requestId);
      // Refresh requests after accepting
      await fetchReceivedRequests();
      return { success: true };
    } catch (err) {
      console.error("Error accepting request:", err);
      return { success: false, error: err.message };
    }
  };

  const declineRequest = async (requestId) => {
    try {
      await developerService.declineRequest(requestId);
      // Refresh requests after declining
      await fetchReceivedRequests();
      return { success: true };
    } catch (err) {
      console.error("Error declining request:", err);
      return { success: false, error: err.message };
    }
  };

  const sendConnectionRequest = async (developerId, message) => {
    try {
      await developerService.sendConnectionRequest(developerId, message);
      // Refresh sent requests
      await fetchSentRequests();
      return { success: true };
    } catch (err) {
      console.error("Error sending request:", err);
      return { success: false, error: err.message };
    }
  };

  return {
    receivedRequests,
    sentRequests,
    loading,
    error,
    acceptRequest,
    declineRequest,
    sendConnectionRequest,
    refetch: fetchAllRequests,
  };
};

/**
 * Custom hook to update user profile
 * @returns {Object} - Functions and state for profile updates
 */
export const useProfileUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const updateProfile = async (profileData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const data = await developerService.updateProfile(profileData);
      setSuccess(true);
      return { success: true, data };
    } catch (err) {
      const errorMessage = err.message || "Failed to update profile";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    updateProfile,
    loading,
    error,
    success,
  };
};
