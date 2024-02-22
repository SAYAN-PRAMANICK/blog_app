import mongoose from "mongoose";

const schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  categories: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
  },
});

const Post = mongoose.model("Post", schema);

export default Post;
