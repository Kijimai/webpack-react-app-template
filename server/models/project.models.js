const mongoose = require("mongoose")

const ProjectSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "An author is required!"],
    },
    title: {
      type: String,
      required: [true, "Job title is required!"],
    },
    postContent: {
      type: String,
      required: true,
    },
    neededExpertise: {
      type: [String],
      enum: [
        "2d artist",
        "3d artist",
        "illustrator",
        "game concept artist",
        "film concept artist",
        "2d animator",
        "3d animator",
        "matte painter",
      ],
    },
    difficulty: {
      type: String,
      enum: ["entry", "intermediate", "expert"],
    },
  },
  { timestamps: true }
)

const Project = mongoose.model("Project", ProjectSchema)
module.exports = { Project, ProjectSchema }
