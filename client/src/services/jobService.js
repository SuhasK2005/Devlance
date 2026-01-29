import axios from "axios";

const API_URL = "http://localhost:5000/api/jobs";

export const createJob = async (jobData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(API_URL, jobData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getAllJobs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getJobById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateJob = async (id, jobData) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(`${API_URL}/${id}`, jobData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteJob = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
