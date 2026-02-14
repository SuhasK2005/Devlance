import { useAuth } from "../contexts/AuthContext";
import Header from "../components/layout/Header";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    { label: "Profile Views", value: "1,234" },
    { label: "Connections", value: "56" },
    { label: "Active Requests", value: "8" },
    { label: "Completed Projects", value: "12" },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-400">
            Here's what's happening with your profile
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-900 border border-gray-800 rounded-lg p-6"
            >
              <div className="text-gray-400 text-sm mb-2">{stat.label}</div>
              <div className="text-3xl font-bold text-white">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/developers"
              className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition text-center"
            >
              <div className="text-cyan-400 text-2xl mb-2">👥</div>
              <div className="text-white font-medium">Find Developers</div>
            </Link>
            <Link
              to="/profile"
              className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition text-center"
            >
              <div className="text-cyan-400 text-2xl mb-2">✏️</div>
              <div className="text-white font-medium">Edit Profile</div>
            </Link>
            <Link
              to="/requests"
              className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition text-center"
            >
              <div className="text-cyan-400 text-2xl mb-2">📬</div>
              <div className="text-white font-medium">View Requests</div>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4 text-gray-400">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
              <span>You connected with Sarah Johnson</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
              <span>New collaboration request from Mike Chen</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
              <span>Your profile was viewed 23 times</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
