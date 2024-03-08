const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: [{ type: String }],
});

module.exports = mongoose.model('Post', postSchema);
