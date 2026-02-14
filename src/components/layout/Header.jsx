import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-white">
            Devlance
          </Link>

          {user ? (
            <nav className="flex items-center gap-6">
              <Link
                to="/dashboard"
                className="text-gray-300 hover:text-white transition"
              >
                Dashboard
              </Link>
              <Link
                to="/developers"
                className="text-gray-300 hover:text-white transition"
              >
                Developers
              </Link>
              <Link
                to="/profile"
                className="text-gray-300 hover:text-white transition"
              >
                Profile
              </Link>
              <Link
                to="/requests"
                className="text-gray-300 hover:text-white transition"
              >
                Requests
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white transition"
              >
                Logout
              </button>
            </nav>
          ) : (
            <Link
              to="/login"
              className="px-6 py-2 bg-cyan-400 text-black font-semibold rounded hover:bg-cyan-300 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
