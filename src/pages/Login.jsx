import { useNavigate } from "react-router-dom";
import GoogleLogin from "../components/auth/GoogleLogin";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome to Devlance
          </h1>
          <p className="text-gray-400">Connect with developers worldwide</p>
        </div>

        <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
          <GoogleLogin />

          <div className="mt-6 text-center text-sm text-gray-400">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
