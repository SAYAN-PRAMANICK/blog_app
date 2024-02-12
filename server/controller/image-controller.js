const url_backend = "http://localhost:8000";

// export const uploadImage = (req, res) => {
//   if (!req.file) {
//     return res.status(404).json({ msg: "File not found!" });
//   }
//   console.log(req);

//   const imageUrl = `${url_backend}/file/${req.file.filename}`;
//   return res.status(200).json(imageUrl);
// };

export const uploadImage = (req, res) => {
  // console.log(req.files.name);

  return res.send("hi from backend");
};
