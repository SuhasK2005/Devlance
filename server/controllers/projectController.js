const Project = require("../models/Project");
const Proposal = require("../models/Proposal");
const Job = require("../models/Job");

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const { jobId, proposalId } = req.body;

    // Check if job and proposal exist
    const job = await Job.findById(jobId);
    const proposal = await Proposal.findById(proposalId);

    if (!job || !proposal) {
      return res.status(404).json({ message: "Job or Proposal not found" });
    }

    // Check if user is the client
    if (job.client.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const project = await Project.create({
      job: jobId,
      client: req.user.id,
      freelancer: proposal.freelancer,
      proposal: proposalId,
    });

    // Update job and proposal status
    job.status = "in-progress";
    proposal.status = "accepted";
    await job.save();
    await proposal.save();

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get user's projects
exports.getMyProjects = async (req, res) => {
  try {
    const query = {
      $or: [{ client: req.user.id }, { freelancer: req.user.id }],
    };

    const projects = await Project.find(query)
      .populate("job", "title")
      .populate("client", "name email")
      .populate("freelancer", "name email")
      .sort({ createdAt: -1 });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("job")
      .populate("client", "name email")
      .populate("freelancer", "name email profile")
      .populate("proposal");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update project
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await project.deleteOne();
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
