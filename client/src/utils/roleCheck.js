// Frontend-only role checking utilities
// Note: These functions check localStorage directly for compatibility
// Consider using useAuth hook in React components instead

export const checkRole = (allowedRoles) => {
  const userData = localStorage.getItem("user");
  if (!userData) return false;
  const user = JSON.parse(userData);
  return allowedRoles.includes(user.role);
};

export const isClient = () => {
  const userData = localStorage.getItem("user");
  if (!userData) return false;
  const user = JSON.parse(userData);
  return user.role === "client";
};

export const isFreelancer = () => {
  const userData = localStorage.getItem("user");
  if (!userData) return false;
  const user = JSON.parse(userData);
  return user.role === "freelancer";
};

export const isAdmin = () => {
  const userData = localStorage.getItem("user");
  if (!userData) return false;
  const user = JSON.parse(userData);
  return user.role === "admin";
};
