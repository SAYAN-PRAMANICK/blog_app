import mongoose from "mongoose";

const Schema = mongoose.Schema({
  imageId: {
    type: Number,
  },
  imageName: {
    type: String,
  },
  imageData: {
    type: String,
  },
});

const Image = mongoose.model("image", Schema);

export default Image;
