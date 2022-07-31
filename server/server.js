require("dotenv").config()

const express = require("express")
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const PORT = process.env.PORT || 8000

require("./config/mongoose.config")

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
//Change cors origin on deployment
app.use(
  cors({
    credentials: true,
    origin: process.env.LIVE_SITE_URL || "http://localhost:3000",
  })
)

require("./routes/user.routes")(app)
require("./routes/project.routes")(app)

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
