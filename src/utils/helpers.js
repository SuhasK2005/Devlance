/**
 * Utility functions for the Devlance application
 */

/**
 * Format date to readable string
 * @param {string|Date} date - Date to format
 * @returns {string} - Formatted date string
 */
export const formatDate = (date) => {
  const d = new Date(date);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return d.toLocaleDateString("en-US", options);
};

/**
 * Get initials from name
 * @param {string} name - Full name
 * @returns {string} - Initials
 */
export const getInitials = (name) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Is valid email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} - Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

/**
 * Generate random avatar URL
 * @param {string} seed - Seed for random avatar
 * @returns {string} - Avatar URL
 */
export const generateAvatar = (seed) => {
  const randomNum = (Math.abs(hashCode(seed)) % 70) + 1;
  return `https://i.pravatar.cc/150?img=${randomNum}`;
};

/**
 * Simple hash function for string
 * @param {string} str - String to hash
 * @returns {number} - Hash code
 */
const hashCode = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash;
};

/**
 * Debounce function to limit API calls
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Check if user is connected with another developer
 * @param {Array} connections - Array of connections
 * @param {string} developerId - Developer ID to check
 * @returns {boolean} - Is connected
 */
export const isConnected = (connections, developerId) => {
  return connections?.some((conn) => conn.id === developerId);
};

/**
 * Get connection status badge color
 * @param {string} status - Connection status
 * @returns {string} - Tailwind color classes
 */
export const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "bg-yellow-400/10 text-yellow-400 border-yellow-400/30";
    case "accepted":
      return "bg-green-400/10 text-green-400 border-green-400/30";
    case "declined":
      return "bg-red-400/10 text-red-400 border-red-400/30";
    default:
      return "bg-gray-400/10 text-gray-400 border-gray-400/30";
  }
};

/**
 * Filter array by search query
 * @param {Array} items - Array to filter
 * @param {string} query - Search query
 * @param {Array} fields - Fields to search in
 * @returns {Array} - Filtered array
 */
export const filterBySearch = (items, query, fields = []) => {
  if (!query) return items;

  const lowerQuery = query.toLowerCase();
  return items.filter((item) => {
    return fields.some((field) => {
      const value = item[field];
      if (typeof value === "string") {
        return value.toLowerCase().includes(lowerQuery);
      }
      if (Array.isArray(value)) {
        return value.some((v) =>
          v.toString().toLowerCase().includes(lowerQuery),
        );
      }
      return false;
    });
  });
};
