import Post from "../model/post.js";

export const uploadPost = async (req, res) => {
  try {
    const post = await new Post(req.body);
    post
      .save()
      .then((result) =>
        res.status(200).send(`"${result.title}": saved successfully!`)
      )
      .catch((err) => {
        // console.log(err.message);
        return res.status(500).send(err.message);
      });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
export const updatePostById = async (req, res) => {
  const [_id, updatedPost] = req.body;
  try {
    const post = await Post.findByIdAndUpdate(_id, { $set: updatedPost });
    post
      .save()
      .then((result) => res.status(200).send(`post updated successfully!`))
      .catch((err) => {
        return res.status(500).send(err.message);
      });
  } catch (error) {
    return res.status(500).send(err.message);
  }
};
export const getAllPost = async (req, res) => {
  const category = req.body.category;
  try {
    let posts =
      !category || category == "All"
        ? await Post.find({})
        : await Post.find({ categories: category });
    return res.status(200).send(posts);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
export const getPostById = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    return res.status(200).send(post);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
export const deletePostById = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.deleteOne({ _id: id });
    return res.status(200).send(post);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
