const getAllJobs = async (req, res) => {
  res.send("Get all jobs");
};
const getJob = async (req, res) => {
  res.send("Get single job");
};
const createJob = async (req, res) => {
  res.json({ user: req.user });
};
const updateJob = async (req, res) => {
  res.send("Update job");
};
const deleteJob = async (req, res) => {
  res.send("Delete job");
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
