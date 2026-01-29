import axios from "axios";

const API_URL = "http://localhost:5000/api/proposals";

export const createProposal = async (proposalData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(API_URL, proposalData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getProposalsByJob = async (jobId) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/job/${jobId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getMyProposals = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/my`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateProposal = async (id, proposalData) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(`${API_URL}/${id}`, proposalData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteProposal = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
