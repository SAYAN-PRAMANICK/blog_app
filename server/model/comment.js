import mongoose from "mongoose";

const Schema = mongoose.Schema({
  postId: { type: String, required: true },
  commentId: { type: String, required: true },
  username: { type: String, required: true },
  comment: { type: String, required: true },
  date: { type: String, required: true, default: "date unknown" },
});

const Comment = mongoose.model("comment", Schema);

export default Comment;
