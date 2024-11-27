const Project = require("../model/projectSchema");
const User = require("../model/userSchema");

//  create Project api
exports.createProject = async (req, res) => {
  try {
    // get data from req.body
    const { title, userId } = req.body;

    //  validate data;
    if (!title || !userId) {
      return res.status(400).json({
        success: false,
        message: "fields are missing",
      });
    }

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user no exist.",
      });
    }

    //  now create an entry of project in DB
    const project = await Project.create({ title: title, createdBy: user._id });

    //    add project id in users db;
    const populatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { projects: project._id },
      { new: true }
    )
      .populate("projects")
      .exec();

    //populate projects also
    const projectDetails = await Project.findById(project._id)
      .populate("createdBy")
      .exec();

    //  send response with success response;
    res.status(200).json({
      success: true,
      message: "Project Added",
      data: {
        userData: populatedUser,
        projectData: projectDetails,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server error.",
    });
  }
};

//  get all projects api
exports.getAllProjects = async (req, res) => {
  try {
    // get user id from req.body;
    const { userId } = req.body;

    //  validate id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "user id not found",
      });
    }

    //  get all projects of the user;
    const projects = await Project.find({ createdBy: userId });

    // validate project;
    if (!projects) {
      return res.status(400).json({
        success: false,
        message: "project not found",
      });
    }

    //  send data in response;
    res.status(200).json({
      success: true,
      message: "All projects fetched.",
      projects,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

//  delete project api
exports.deleteProject = async (req, res) => {
  try {
    // get userId and projId from req.body;
    const { userId, projId } = req.body;

    // validate data;
    if (!userId || !projId) {
      return res.status(400).json({
        success: false,
        message: "please provide id's",
      });
    }

    //  now find the project and delete it;
    const updatedProject = await Project.findOneAndDelete(
      { createdBy: userId },
      { new: true }
    );

    //  validate updatedProject;
    if (!updatedProject) {
      return res.status(400).json({
        success: false,
        message: "unable to delete project",
      });
    }

    //  remove the project from users database;
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { projects: projId } },
      { new: true }
    );

    //  validate update user;
    if (!updatedUser) {
      return res.status(400).json({
        success: false,
        message: "unable to update user",
      });
    }

    //  send updated data in response;
    res.status(200).json({
      success: true,
      message: "Project deleted.",
      data: {
        updatedProject,
        updatedUser,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//  update project api;
exports.updateproject = async (req, res) => {
  try {
    // get updated data from body;
    const { userId, projId, htmlCode, cssCode, jsCode } = req.body;

    //  validate;
    if (!userId || !htmlCode || !cssCode || !jsCode || !projId) {
      return res.status(400).json({
        success: false,
        message: "data missing.",
      });
    }

    //  now update project;
    const updatedProject = await Project.findOneAndUpdate(
      { _id: projId },
      { htmlCode: htmlCode, cssCode: cssCode, jsCode: jsCode },
      { new: true }
    );

    //  validate updatedproject
    if (!updatedProject) {
      return res.status(200).json({
        success: false,
        message: "Unable to update project",
      });
    }

    // send response with success flag;
    res.status(200).json({
      success: true,
      message: "Project Updated",
      data: updatedProject,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// get a single project api
exports.getProject = async (req, res) => {
  try {
    // get userId and projectId from req.body;
    const { userId, projId } = req.body;

    // validate;
    if (!userId || !projId) {
      return res.status(400).json({
        success: false,
        message: "Please give required details",
      });
    }

    // find user and get the project;
    const user = await User.findOne({ _id: userId });

    //  validate user;
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not valid",
      });
    }

    // search project;
    const project = await Project.findOne({ _id: projId });

    // validate project
    if (!project) {
      return res.status(400).json({
        success: false,
        message: "project not found",
      });
    }

    // return response ;
    res.status(200).json({
      success: true,
      message: "Project fetched",
      data: project,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
