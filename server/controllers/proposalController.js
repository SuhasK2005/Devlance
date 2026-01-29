const Proposal = require("../models/Proposal");
const Job = require("../models/Job");

// Create a new proposal
exports.createProposal = async (req, res) => {
  try {
    const { jobId, coverLetter, proposedBudget, estimatedTime } = req.body;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if user already submitted a proposal
    const existingProposal = await Proposal.findOne({
      job: jobId,
      freelancer: req.user.id,
    });

    if (existingProposal) {
      return res
        .status(400)
        .json({ message: "You already submitted a proposal for this job" });
    }

    const proposal = await Proposal.create({
      job: jobId,
      freelancer: req.user.id,
      coverLetter,
      proposedBudget,
      estimatedTime,
    });

    // Add proposal to job
    job.proposals.push(proposal._id);
    await job.save();

    res.status(201).json(proposal);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get proposals for a specific job
exports.getProposalsByJob = async (req, res) => {
  try {
    const proposals = await Proposal.find({ job: req.params.jobId })
      .populate("freelancer", "name email profile")
      .sort({ createdAt: -1 });
    res.json(proposals);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get freelancer's proposals
exports.getMyProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find({ freelancer: req.user.id })
      .populate("job", "title budget deadline")
      .sort({ createdAt: -1 });
    res.json(proposals);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update proposal status
exports.updateProposal = async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id);

    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    const updatedProposal = await Proposal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedProposal);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete proposal
exports.deleteProposal = async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id);

    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    // Check if user is the proposal owner
    if (proposal.freelancer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await proposal.deleteOne();
    res.json({ message: "Proposal deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
