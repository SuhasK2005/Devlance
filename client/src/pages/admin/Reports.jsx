import React from "react";

const Reports = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Reports & Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">Revenue Report</h3>
          <p className="text-gray-500">No data available.</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">User Activity</h3>
          <p className="text-gray-500">No data available.</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
