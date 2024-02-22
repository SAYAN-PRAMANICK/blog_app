import Image from "../model/image.js";

export const uploadImage = async (req, res) => {
  if (!req.body) {
    return res.status(404).json({ msg: "Image Not Found!" });
  }
  const { imageId, imageName, imageData } = req.body;
  const newImage = new Image({ imageId, imageName, imageData });
  await newImage.save();
  return res.status(200).json(req.body);
};

export const getImage = async (req, res) => {
  const file = await Image.findOne({ imageName: req.params.filename });

  res.send(file);
};
