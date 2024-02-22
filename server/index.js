import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Connection from "./database/db.js";
import Router from "./routes/route.js";
import fileUpload from "express-fileupload";
import bodyparser from "body-parser";
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~app cursor~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export const app = express();

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Middlewares~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.use(cors());
app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb" }));
app.use(fileUpload()); //Image uploader middlewawre
app.use("/", Router);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~DELETED Image Upload api~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// app.post("/upload-endpoint", (req, res) => {
//   const uploadedFile = req.files;
//   console.log(uploadedFile);

//   // const name = req.body.filename;
//   // const fileContent = JSON.parse(JSON.stringify(req.files));
//   // console.log("---------------", fileContent, "---------------");
//   res.json({ message: "File uploaded successfully.", uploadedFile });
// });

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Private Environment variables~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

dotenv.config();
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Starting server~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const port = 8000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~DB connection initialisation~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Connection(USERNAME, PASSWORD);
