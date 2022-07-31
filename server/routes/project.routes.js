const { authenticate } = require("../config/jwt.config")
const ProjectController = require("../controllers/project.controllers")

module.exports = (app) => {
  app.get("/api/all_projects", ProjectController.getAllProjects)
  app.post("/api/matched_projects", ProjectController.getMatchedProjects)
  app.get(
    "/api/projects/userProjects",
    authenticate,
    ProjectController.getAllProjectsByUser
  )
  app.get("/api/projects/:id", ProjectController.getOneProject)
  app.post("/api/projects/new", authenticate, ProjectController.createProject)
  app.delete("/api/delete_projects", ProjectController.clearProjects)
}
