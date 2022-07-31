const jwt = require("jsonwebtoken")
const { User } = require("../models/user.models")
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((foundUsers) => res.json(foundUsers))
    .catch((error) => {
      return res
        .status(400)
        .json({ message: "Something went horribly wrong!", error })
    })
}

module.exports.getAllEmployers = (req, res) => {
  User.find({ userType: "employer" })
    .then((foundUsers) => res.json(foundUsers))
    .catch((error) => {
      return res
        .status(400)
        .json({ message: "Something went horribly wrong!", error })
    })
}

module.exports.getAllArtists = (req, res) => {
  User.find({ userType: "artist" })
    .then((foundUsers) => res.json(foundUsers))
    .catch((error) => {
      return res
        .status(400)
        .json({ message: "Something went horribly wrong!", error })
    })
}

// Retrieve One user without password information
module.exports.getOneUser = (req, res) => {
  User.findById(req.params.id)
    .select("-password")
    .then((foundUser) => {
      return res.json(foundUser)
    })
    .catch((error) => {
      return res.status(400).json({ message: "Something went wrong!", error })
    })
}

module.exports.getOneFeaturedArtist = (req, res) => {
  User.find({ userType: "artist", isFeatured: true })
    .then((foundArtists) => {
      const featuredArtist =
        foundArtists[Math.floor(Math.random() * foundArtists.length)]
      return res.json(featuredArtist)
    })
    .catch((error) => {
      return res.status(400).json({ message: "Something went wrong!", error })
    })
}

module.exports.updateUser = asyncHandler(async (req, res) => {
  const { fName, lName, expertise } = req.body
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        fName,
        lName,
        expertise,
      },
      { new: true }
    )
    return res.status(200).json(updatedUser)
  } catch (err) {
    res.status(400).json({ message: "Something went wrong!", err })
  }
})

module.exports.register = asyncHandler(async (req, res) => {
  console.log(req.body)
  try {
    const emailExists = await User.findOne({ email: req.body.email })

    if (emailExists) {
      return res
        .status(400)
        .json({ message: "A user with that email already exists!" })
    }

    const createdUser = await User.create(req.body)
    const userToken = jwt.sign(
      { id: createdUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    )

    return res
      .status(201)
      .cookie("userToken", userToken, {
        httpOnly: true,
      })
      .json({
        message: "Successfully registered user!",
        _id: createdUser.id,
        email: createdUser.email,
        userToken,
      })
  } catch (err) {
    return res.status(400).json({ message: "Something went wrong!", err })
  }
})

module.exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  console.log(email, password)

  try {
    const user = await User.findOne({ email })
    if (user === null) {
      return res
        .status(400)
        .json({ message: "No user with that email was found." })
    }

    const correctPassword = await bcrypt.compare(password, user.password)

    if (!correctPassword) {
      return res
        .status(400)
        .json({ message: "Email or Password is incorrect!" })
    }

    const userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    })

    return res
      .cookie("userToken", userToken, { httpOnly: true })
      .json({ message: "Token created. Successfully signed in!", userToken })
  } catch (err) {
    return res.status(400).json({ message: "Something went wrong!", err })
  }
})

module.exports.logout = (req, res) => {
  res.clearCookie("userToken")
  res.status(200).json({ message: "Successfully logged out!" })
}
