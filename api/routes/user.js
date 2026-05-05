import express from "express";
import fetchuser from "../middleware/fetchUser.js";
import { getUserData, signIn, signUp } from "../controllers/user.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/getuserdata", fetchuser, getUserData);

export default router;
