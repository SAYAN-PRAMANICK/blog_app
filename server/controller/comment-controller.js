import Comment from "../model/comment.js";

export const uploadComment = async (req, res) => {
  //   console.log(req.body);
  const newComment = new Comment(req.body);
  newComment
    .save()
    .then((response) => {
      return res.status(200).send("comment saved successfully!");
    })
    .catch((err) => {
      return res.status(500).send(err.message);
    });
};

export const getAllComments = async (req, res) => {
  await Comment.find({ postId: req.params.id })
    .then((response) => {
      return res.status(200).send(response);
    })
    .catch((err) => {
      return res.status(500).send(err.message);
    });
};

export const deleteCommentById = async (req, res) => {
  // console.log(req.params.id);
  await Comment.deleteOne({ commentId: req.params.id })
    .then((response) => {
      if (response.deletedCount == 1) {
        return res.status(200).send("comment deleted successfully");
      } else {
        return res.status(200).send("Some Problem arised!");
      }
    })
    .catch((err) => {
      return res.status(500).send(err.message);
    });
};
