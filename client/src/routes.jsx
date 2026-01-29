import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Client Pages
import ClientDashboard from "./pages/client/Dashboard";
import PostJob from "./pages/client/PostJob";
import ClientJobs from "./pages/client/Jobs";
import ClientProposals from "./pages/client/Proposals";
import ClientProject from "./pages/client/Project";

// Freelancer Pages
import FreelancerDashboard from "./pages/freelancer/Dashboard";
import FreelancerProfile from "./pages/freelancer/Profile";
import FreelancerJobs from "./pages/freelancer/Jobs";
import FreelancerProposals from "./pages/freelancer/Proposals";
import FreelancerProjects from "./pages/freelancer/Projects";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminJobs from "./pages/admin/Jobs";
import AdminReports from "./pages/admin/Reports";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Client Routes */}
        <Route
          path="/client/dashboard"
          element={
            <ProtectedRoute allowedRoles={["client"]}>
              <ClientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/post-job"
          element={
            <ProtectedRoute allowedRoles={["client"]}>
              <PostJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/jobs"
          element={
            <ProtectedRoute allowedRoles={["client"]}>
              <ClientJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/proposals"
          element={
            <ProtectedRoute allowedRoles={["client"]}>
              <ClientProposals />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/projects"
          element={
            <ProtectedRoute allowedRoles={["client"]}>
              <ClientProject />
            </ProtectedRoute>
          }
        />

        {/* Freelancer Routes */}
        <Route
          path="/freelancer/dashboard"
          element={
            <ProtectedRoute allowedRoles={["freelancer"]}>
              <FreelancerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/freelancer/profile"
          element={
            <ProtectedRoute allowedRoles={["freelancer"]}>
              <FreelancerProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/freelancer/jobs"
          element={
            <ProtectedRoute allowedRoles={["freelancer"]}>
              <FreelancerJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/freelancer/proposals"
          element={
            <ProtectedRoute allowedRoles={["freelancer"]}>
              <FreelancerProposals />
            </ProtectedRoute>
          }
        />
        <Route
          path="/freelancer/projects"
          element={
            <ProtectedRoute allowedRoles={["freelancer"]}>
              <FreelancerProjects />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/jobs"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminReports />
            </ProtectedRoute>
          }
        />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
