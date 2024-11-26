const express = require("express");
const router = express.Router();
const projectRoute = require("../controller/project");
const {
  createProject,
  updateproject,
  deleteProject,
  getAllProjects,
  getProject,
} = projectRoute;

//  create porject Routes
router.post("/createProj", createProject);
router.post("/updateProj", updateproject);
router.post("/deleteProj", deleteProject);
router.post("/getAllProj", getAllProjects);
router.post("/getProj", getProject);

module.exports = router;
