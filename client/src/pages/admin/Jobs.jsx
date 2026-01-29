import React from "react";

const Jobs = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Jobs</h1>
      <div className="bg-white p-4 rounded shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Title</th>
              <th className="text-left p-2">Client</th>
              <th className="text-left p-2">Budget</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-500">
                No jobs found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Jobs;
