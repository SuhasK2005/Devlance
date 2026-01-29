export const checkRole = (allowedRoles) => {
  const userRole = localStorage.getItem("role");
  return allowedRoles.includes(userRole);
};

export const isClient = () => {
  const userRole = localStorage.getItem("role");
  return userRole === "client";
};

export const isFreelancer = () => {
  const userRole = localStorage.getItem("role");
  return userRole === "freelancer";
};

export const isAdmin = () => {
  const userRole = localStorage.getItem("role");
  return userRole === "admin";
};
