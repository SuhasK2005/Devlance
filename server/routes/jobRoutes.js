const express = require("express");
const router = express.Router();
const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getJobsByClient,
} = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.post("/", protect, authorizeRoles("client"), createJob);
router.get("/", getAllJobs);
router.get("/my", protect, authorizeRoles("client"), getJobsByClient);
router.get("/:id", getJobById);
router.put("/:id", protect, authorizeRoles("client"), updateJob);
router.delete("/:id", protect, authorizeRoles("client"), deleteJob);

module.exports = router;
