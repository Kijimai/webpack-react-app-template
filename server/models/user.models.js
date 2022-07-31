const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const { ProjectSchema } = require("./project.models")

const UserSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: [true, "First Name is required!"],
      minLength: [2, "First Name must be at least 2 characters long!"],
    },
    lName: {
      type: String,
      required: [true, "Last Name is required!"],
      minLength: [2, "Last Name must be at least 2 characters long!"],
    },
    email: {
      type: String,
      required: [true, "Email field is required!"],
      minLength: [8, "Email must be at least 8 characters long!"],
    },
    avatar: {
      type: String,
    },
    bio: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Password field is required!"],
      minLength: [8, "Password length must be at least 8 characters long!"],
    },
    expertise: {
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
    userType: {
      type: String,
      required: [true, "You must assign a role to this user!"],
      enum: ["artist", "employer"],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    projects: [ProjectSchema],
    hiredArtists: [this],
  },
  { timestamps: true }
)

UserSchema.virtual("confirmPassword")
  .get(() => this.confirmPassword)
  .set((value) => (this.confirmPassword = value))

UserSchema.pre("validate", function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Password must match confirm password.")
  }
  next()
})

UserSchema.pre("save", function (next) {
  bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash
    next()
  })
})

module.exports.User = mongoose.model("User", UserSchema)
