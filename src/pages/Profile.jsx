import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Header from "../components/layout/Header";
import { useProfileUpdate } from "../hooks/useDevelopers";
import ErrorMessage from "../components/common/ErrorMessage";
import SuccessMessage from "../components/common/SuccessMessage";

const Profile = () => {
  const { user, updateProfile: updateAuthProfile } = useAuth();
  const { updateProfile, loading, error, success } = useProfileUpdate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    skills: user?.skills || [],
    github: user?.github || "",
    linkedin: user?.linkedin || "",
    portfolio: user?.portfolio || "",
  });
  const [newSkill, setNewSkill] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call API to update profile
    const result = await updateProfile(formData);

    if (result.success) {
      // Update local auth state
      updateAuthProfile(formData);
      setIsEditing(false);
      setSuccessMessage("Profile updated successfully!");

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">My Profile</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-6 py-2 bg-cyan-400 text-black font-semibold rounded hover:bg-cyan-300 transition"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {successMessage && (
          <SuccessMessage
            message={successMessage}
            onClose={() => setSuccessMessage("")}
          />
        )}

        {error && !isEditing && <ErrorMessage message={error} />}

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
          {!isEditing ? (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <img
                  src={user?.avatar || "https://via.placeholder.com/150"}
                  alt={user?.name}
                  className="w-24 h-24 rounded-full"
                />
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {user?.name}
                  </h2>
                  <p className="text-gray-400">{user?.email}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Bio</h3>
                <p className="text-gray-400">
                  {user?.bio || "No bio added yet"}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {user?.skills?.length > 0 ? (
                    user.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-cyan-400/10 text-cyan-400 rounded-full border border-cyan-400/30"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-400">No skills added yet</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Links</h3>
                <div className="space-y-2 text-gray-400">
                  {user?.github && (
                    <div>
                      <span className="text-gray-500">GitHub:</span>{" "}
                      <a
                        href={user.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:underline"
                      >
                        {user.github}
                      </a>
                    </div>
                  )}
                  {user?.linkedin && (
                    <div>
                      <span className="text-gray-500">LinkedIn:</span>{" "}
                      <a
                        href={user.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:underline"
                      >
                        {user.linkedin}
                      </a>
                    </div>
                  )}
                  {user?.portfolio && (
                    <div>
                      <span className="text-gray-500">Portfolio:</span>{" "}
                      <a
                        href={user.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:underline"
                      >
                        {user.portfolio}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <ErrorMessage message={error} />}

              <div>
                <label className="block text-white mb-2 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-cyan-400"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">
                  Skills
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), handleAddSkill())
                    }
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-cyan-400"
                    placeholder="Add a skill..."
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-6 py-2 bg-cyan-400 text-black font-semibold rounded hover:bg-cyan-300 transition"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-cyan-400/10 text-cyan-400 rounded-full border border-cyan-400/30 flex items-center gap-2"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-cyan-400 hover:text-cyan-300"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">
                  GitHub URL
                </label>
                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-cyan-400"
                  placeholder="https://github.com/username"
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-cyan-400"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">
                  Portfolio URL
                </label>
                <input
                  type="url"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-cyan-400"
                  placeholder="https://yourportfolio.com"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full px-6 py-3 bg-cyan-400 text-black font-semibold rounded transition ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-cyan-300"
                }`}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
