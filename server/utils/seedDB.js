const { faker } = require("@faker-js/faker")
const { User } = require("../models/user.models")
const mongoose = require("mongoose")
require('dotenv').config()

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/design_deliverDB")
  .then(() => {
    console.log(`Database connection established!`)
  })
  .catch((err) => {
    console.log("There was an error!", err)
  })

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error: "))
db.once("open", () => {
  console.log("Database connected")
})

const expertiseList = [
  "illustrator",
  "2d artist",
  "3d artist",
  "game concept artist",
  "film concept artist",
  "2d animator",
  "3d animator",
  "matte painter",
]

const seedDatabase = async () => {
  await User.deleteMany({})
  for (let i = 1; i < 100; i++) {
    const randomNum = Math.floor(Math.random() * 100) + 1

    let isFeaturedVal = Math.floor(Math.random() * 2)

    let fName = faker.name.firstName()
    let lName = faker.name.lastName()
    let email = faker.internet.email()
    let expertise =
      expertiseList[Math.floor(Math.random() * expertiseList.length)]
    let bio = faker.lorem.paragraphs()
    let password = faker.internet.password()
    let confirmPassword = password
    let avatar = faker.image.avatar()
    let isFeatured = isFeaturedVal === 1 ? true : false
    let userType = randomNum <= 25 ? "employer" : "artist"

    if (userType === "employer") {
      await User.create({
        fName,
        lName,
        email,
        avatar,
        password,
        confirmPassword,
        userType,
        bio,
      })
    } else {
      await User.create({
        fName,
        lName,
        email,
        avatar,
        expertise,
        password,
        confirmPassword,
        isFeatured,
        userType,
        bio,
      })
    }
  }
}

seedDatabase().then(() => db.close())
