const { authenticate } = require("../config/jwt.config")
const UserController = require("../controllers/user.controllers")

module.exports = (app) => {
  app.get("/api/all_artists", authenticate, UserController.getAllArtists)
  app.get("/api/all_employers", UserController.getAllEmployers)
  app.get("/api/users/:id", UserController.getOneUser)
  app.get("/api/featured_artist", UserController.getOneFeaturedArtist)
  app.put("/api/users/edit/:id", UserController.updateUser)
  app.post("/api/users/new", UserController.register)
  app.post("/api/users/login", UserController.login)
  app.get("/api/users/logout", UserController.logout)
}
