import express from "express";
import fetchuser from "";
import { signIn, signUp } from "../controllers/user";

const router = express.Router;

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/getuserdata", getUserData);

export default router;
