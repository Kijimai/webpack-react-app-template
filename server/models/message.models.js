const mongoose = require("mongoose")

const MessageSchema = mongoose.Schema(
  {
    message: {
      text: {
        type: String,
        required: true,
      },
    },
    users: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      },
    ],
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dateRead: {
      type: Date,
    },
  },
  { timeStamps: true }
)

const Message = mongoose.model("Message", MessageSchema)
module.exports = { Message, MessageSchema }
