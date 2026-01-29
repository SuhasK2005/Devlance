const express = require("express");
const router = express.Router();
const {
  createProposal,
  getProposalsByJob,
  getMyProposals,
  updateProposal,
  deleteProposal,
} = require("../controllers/proposalController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.post("/", protect, authorizeRoles("freelancer"), createProposal);
router.get("/my", protect, authorizeRoles("freelancer"), getMyProposals);
router.get("/job/:jobId", protect, getProposalsByJob);
router.put("/:id", protect, updateProposal);
router.delete("/:id", protect, authorizeRoles("freelancer"), deleteProposal);

module.exports = router;
