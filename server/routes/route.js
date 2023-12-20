import express from "express";
import signupUser from "../controller/user-controller.js";
import { newUserValidator } from "../validator/validator.js";

const router = express.Router()


router.post("/signup", newUserValidator)
// router.post("/signup", signupUser)


export default router