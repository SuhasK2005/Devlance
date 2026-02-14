import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Discover, connect and
            <br />
            collaborate with developers
          </h1>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Platform with over 7,000 unique developer profiles
            <br />
            and more than 1,000 active collaborations
          </p>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => navigate("/developers")}
              className="px-8 py-3 bg-cyan-400 text-black font-semibold rounded hover:bg-cyan-300 transition-all hover:shadow-lg hover:shadow-cyan-400/50"
            >
              Start connecting
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 bg-transparent text-white font-semibold rounded border-2 border-white hover:bg-white/10 transition-all"
            >
              Create Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
