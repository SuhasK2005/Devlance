import { useState } from "react";
import Header from "../components/layout/Header";
import { useConnectionRequests } from "../hooks/useDevelopers";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";
import SuccessMessage from "../components/common/SuccessMessage";
import { formatDate } from "../utils/helpers";

const Requests = () => {
  const [activeTab, setActiveTab] = useState("received");
  const {
    receivedRequests,
    sentRequests,
    loading,
    error,
    acceptRequest,
    declineRequest,
    refetch,
  } = useConnectionRequests();
  const [actionMessage, setActionMessage] = useState("");

  // Mock data for demo when API is not available
  const mockRequests = {
    received: [
      {
        id: 1,
        from: "Mike Chen",
        avatar: "https://i.pravatar.cc/150?img=2",
        message: "Hi! I'd love to collaborate on a React project. Interested?",
        date: "2024-02-10",
        status: "pending",
      },
      {
        id: 2,
        from: "Emily Rodriguez",
        avatar: "https://i.pravatar.cc/150?img=3",
        message:
          "Looking for a frontend developer for my startup. Let's connect!",
        date: "2024-02-09",
        status: "pending",
      },
    ],
    sent: [
      {
        id: 3,
        to: "Sarah Johnson",
        avatar: "https://i.pravatar.cc/150?img=1",
        message: "Interested in collaborating on an open source project?",
        date: "2024-02-08",
        status: "accepted",
      },
      {
        id: 4,
        to: "David Kim",
        avatar: "https://i.pravatar.cc/150?img=4",
        message: "Would you like to work together on a mobile app?",
        date: "2024-02-07",
        status: "pending",
      },
    ],
  };

  const handleAccept = async (requestId) => {
    const result = await acceptRequest(requestId);
    if (result.success) {
      setActionMessage("Request accepted successfully!");
      setTimeout(() => setActionMessage(""), 3000);
    }
  };

  const handleDecline = async (requestId) => {
    const result = await declineRequest(requestId);
    if (result.success) {
      setActionMessage("Request declined.");
      setTimeout(() => setActionMessage(""), 3000);
    }
  };

  // Use API data if available, otherwise use mock data
  const displayReceivedRequests =
    receivedRequests?.length > 0 ? receivedRequests : mockRequests.received;
  const displaySentRequests =
    sentRequests?.length > 0 ? sentRequests : mockRequests.sent;

  const currentRequests =
    activeTab === "received" ? displayReceivedRequests : displaySentRequests;

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <LoadingSpinner fullScreen={false} message="Loading requests..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Collaboration Requests
          </h1>
          <p className="text-gray-400">Manage your collaboration requests</p>
        </div>

        {actionMessage && (
          <SuccessMessage
            message={actionMessage}
            onClose={() => setActionMessage("")}
          />
        )}

        {error && <ErrorMessage message={error} onRetry={refetch} />}

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-800">
          <button
            onClick={() => setActiveTab("received")}
            className={`pb-3 px-2 font-medium transition ${
              activeTab === "received"
                ? "text-cyan-400 border-b-2 border-cyan-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Received ({displayReceivedRequests.length})
          </button>
          <button
            onClick={() => setActiveTab("sent")}
            className={`pb-3 px-2 font-medium transition ${
              activeTab === "sent"
                ? "text-cyan-400 border-b-2 border-cyan-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Sent ({displaySentRequests.length})
          </button>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {currentRequests.length > 0 ? (
            currentRequests.map((request) => (
              <div
                key={request.id}
                className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={request.avatar}
                    alt={request.from || request.to}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {request.from || request.to}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {formatDate(request.date)}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          request.status === "pending"
                            ? "bg-yellow-400/10 text-yellow-400 border border-yellow-400/30"
                            : request.status === "accepted"
                              ? "bg-green-400/10 text-green-400 border border-green-400/30"
                              : "bg-red-400/10 text-red-400 border border-red-400/30"
                        }`}
                      >
                        {request.status.charAt(0).toUpperCase() +
                          request.status.slice(1)}
                      </span>
                    </div>

                    <p className="text-gray-300 mb-4">{request.message}</p>

                    {activeTab === "received" &&
                      request.status === "pending" && (
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleAccept(request.id)}
                            className="px-4 py-2 bg-cyan-400 text-black font-medium rounded hover:bg-cyan-300 transition"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleDecline(request.id)}
                            className="px-4 py-2 bg-transparent text-white border border-gray-700 font-medium rounded hover:bg-gray-800 transition"
                          >
                            Decline
                          </button>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-gray-900 border border-gray-800 rounded-lg">
              <svg
                className="w-16 h-16 text-gray-600 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <p className="text-gray-400 text-lg">No requests to display</p>
              <p className="text-gray-500 text-sm mt-2">
                {activeTab === "received"
                  ? "You haven't received any collaboration requests yet."
                  : "You haven't sent any collaboration requests yet."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Requests;
