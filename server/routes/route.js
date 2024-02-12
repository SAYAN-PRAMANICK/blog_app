import express from "express";
import { newUserValidator } from "../validator/validator.js";
import { loginValidator } from "../validator/validator.js";
import { uploadImage } from "../controller/image-controller.js";
import upload from "../utils/upload.js";

const router = express.Router();

router.post("/signup", newUserValidator);
router.post("/login", loginValidator);
// router.post("/file/upload", uploadImage);

export default router;
