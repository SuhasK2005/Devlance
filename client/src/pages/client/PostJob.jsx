import React, { useState } from "react";

const PostJob = () => {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
    skills: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add post job logic here
    console.log("Post Job:", jobData);
  };

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Post a Job</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <div className="mb-4">
          <label className="block mb-2">Job Title</label>
          <input
            type="text"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            value={jobData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows="5"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Budget</label>
          <input
            type="number"
            name="budget"
            value={jobData.budget}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={jobData.deadline}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Skills Required</label>
          <input
            type="text"
            name="skills"
            value={jobData.skills}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="e.g., React, Node.js, MongoDB"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Post Job
        </button>
      </form>
    </div>
  );
};

export default PostJob;
