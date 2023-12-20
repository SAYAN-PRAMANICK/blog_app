import express from "express";
import { newUserValidator } from "../validator/validator.js";

const router = express.Router()


router.post("/signup", newUserValidator)


export default router