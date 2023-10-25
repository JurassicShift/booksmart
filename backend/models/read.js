const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const readSchema = new Schema({
  book_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: Array,
    required: true,
  },
  authorparse: {
    type: String,
    required: true,
  },
  publisheddate: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    required: false
  },
  date: {
    type: String,
    required: true,
  }
});

const UserWish = mongoose.model("UserRead", readSchema);

module.exports = UserWish;
