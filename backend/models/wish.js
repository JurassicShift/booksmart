const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wishSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: false,
  }
});

const UserWish = mongoose.model("UserWish", wishSchema);

module.exports = UserWish;
