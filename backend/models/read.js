const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const readSchema = new Schema({
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
  },
  rating: {
    type: Number,
    required: true
  }
});

const UserWish = mongoose.model("UserWish", readSchema);

module.exports = UserWish;
