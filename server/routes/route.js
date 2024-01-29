import express from "express";
import { newUserValidator } from "../validator/validator.js";
import { loginValidator } from "../validator/validator.js";

const router = express.Router()


router.post("/signup", newUserValidator)
router.post("/login", loginValidator)

export default router