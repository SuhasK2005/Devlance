import { useState } from "react";
import { Link } from "react-router-dom";

const DeveloperCard = ({ developer, onConnect }) => {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    setIsConnected(true);
    onConnect(developer);
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-cyan-400/50 transition">
      <div className="flex items-start gap-4">
        <img
          src={developer.avatar}
          alt={developer.name}
          className="w-16 h-16 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-xl font-semibold text-white">
                {developer.name}
              </h3>
              <p className="text-gray-400 text-sm">{developer.location}</p>
            </div>
            <button
              onClick={handleConnect}
              disabled={isConnected}
              className={`px-4 py-2 rounded font-medium transition ${
                isConnected
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-cyan-400 text-black hover:bg-cyan-300"
              }`}
            >
              {isConnected ? "Connected" : "Connect"}
            </button>
          </div>

          <p className="text-gray-300 mb-4">{developer.bio}</p>

          <div className="flex flex-wrap gap-2">
            {developer.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-cyan-400/10 text-cyan-400 rounded-full text-sm border border-cyan-400/30"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperCard;
