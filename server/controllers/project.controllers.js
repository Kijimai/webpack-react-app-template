const { Project } = require("../models/project.models")
const asyncHandler = require("express-async-handler")

module.exports.createProject = asyncHandler(async (req, res) => {
  console.log("Creating Project!")
  try {
    const { title, postContent, neededExpertise } = req.body
    const project = await Project.create({
      author: req.user.id,
      title,
      postContent,
      neededExpertise,
    })
    res.status(200).json(project)
  } catch (err) {
    res.status(400).json(err)
  }
})

module.exports.updateProject = asyncHandler(async (req, res) => {})

module.exports.getAllProjects = (req, res) => {
  Project.find({})
    .populate("author", "fName lName avatar _id userType")
    .then((foundProjects) => {
      return res.json(foundProjects)
    })
    .catch((error) => {
      return res.status(400).json({ message: "Something went wrong!", error })
    })
}

module.exports.getOneProject = (req, res) => {
  Project.findOne({ _id: req.params.id })
    .populate("author", "fName lName avatar _id userType")
    .then((project) => {
      return res.json(project)
    })
    .catch((error) => {
      return res.status(400).json({ message: "Something went wrong!", error })
    })
}

module.exports.getAllProjectsByUser = asyncHandler(async (req, res) => {
  const authorID = req.user.id
  Project.find({ author: authorID }).then((foundProjects) => {
    res.status(200).json({ foundProjects })
  })
})

module.exports.getMatchedProjects = asyncHandler(async (req, res) => {
  console.log(req.body)
  try {
    const foundProjects = await Project.find({
      neededExpertise: { $in: req.body.neededExpertise },
    }).populate("author", "fName lName avatar _id userType")
    return res.json(foundProjects)
  } catch (err) {
    throw new Error("Wrong!")
  }
})

// Dev method only
module.exports.clearProjects = (req, res) => {
  Project.deleteMany({})
    .then((res) => {
      return res.json({ message: "Deleted!" })
    })
    .catch((err) => {
      return res.json(err)
    })
}
