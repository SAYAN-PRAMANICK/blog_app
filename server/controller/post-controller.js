import Post from "../model/post.js";

const uploadPost = async (req, res) => {
  try {
    const post = await new Post(req.body);
    post
      .save()
      .then((result) => res.send(`"${result.title}": saved successfully!`))
      .catch((err) => {
        // console.log(err.message);
        return res.status(500).send(err.message);
      });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export default uploadPost;
