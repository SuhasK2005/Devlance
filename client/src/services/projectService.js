import axios from "axios";

const API_URL = "http://localhost:5000/api/projects";

export const createProject = async (projectData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(API_URL, projectData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getMyProjects = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/my`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getProjectById = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateProject = async (id, projectData) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(`${API_URL}/${id}`, projectData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteProject = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
