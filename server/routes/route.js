import express from "express";
import { newUserValidator } from "../validator/validator.js";
import { loginValidator } from "../validator/validator.js";
import { uploadImage, getImage } from "../controller/image-controller.js";
import {
  uploadPost,
  getAllPost,
  getPostById,
  updatePostById,
  deletePostById,
} from "../controller/post-controller.js";
import { authenticateToken } from "../controller/jwt-controller.js";
import {
  uploadComment,
  getAllComments,
  deleteCommentById,
} from "../controller/comment-controller.js";

const router = express.Router();

router.post("/signup", newUserValidator);
router.post("/login", loginValidator);
router.post("/file/upload", uploadImage);
router.post("/file/:filename", getImage);
router.post("/post", authenticateToken, uploadPost);
router.post("/getPosts", authenticateToken, getAllPost);
router.get("/getPostById/:id", authenticateToken, getPostById);
router.post("/updatePostById", authenticateToken, updatePostById);
router.delete("/deletePostById/:id", authenticateToken, deletePostById);
router.post("/uploadComment", authenticateToken, uploadComment);
router.get("/getAllComments/:id", authenticateToken, getAllComments);
router.get("/deleteCommentById/:id", authenticateToken, deleteCommentById);

export default router;
