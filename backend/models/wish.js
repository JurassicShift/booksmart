const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wishSchema = new Schema({
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
  rating: {
    type: Number,
    required: false,
  },
  thumbnail: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    required: true,
  }
});

const UserWish = mongoose.model("UserWish", wishSchema);

module.exports = UserWish;
