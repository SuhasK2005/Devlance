const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getDashboardStats,
  deleteUser,
  updateUserStatus,
} = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get("/users", protect, authorizeRoles("admin"), getAllUsers);
router.get("/stats", protect, authorizeRoles("admin"), getDashboardStats);
router.delete("/users/:id", protect, authorizeRoles("admin"), deleteUser);
router.put(
  "/users/:id/status",
  protect,
  authorizeRoles("admin"),
  updateUserStatus
);

module.exports = router;
