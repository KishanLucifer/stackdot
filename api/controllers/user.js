import express from "express";
import User from "../schema/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// Regex patterns
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^.{6,20}$/;

// Format user data for sending in response
const formatUserDatatoSend = (user) => {
  const access_token = jwt.sign(
    {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
    },
    process.env.SECRET_ACCESS_KEY,
  );
  return {
    success: true,
    access_token,
    id: user._id,
    fullname: user.fullname,
    email: user.email,
  };
};

// Signup Route
export const signUp = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res
        .status(403)
        .json({ error: "Fullname, email, and password are required" });
    }

    const exsistingUser = await User.findOne({ email });

    if (exsistingUser) {
      return res.status(403).json({ error: "Email already exists" });
    }

    if (fullname.length < 3) {
      return res.status(403).json({
        error: "Fullname must be at least 3 letters long",
      });
    }
    if (!emailRegex.test(email)) {
      return res.status(403).json({ error: "Enter a valid Email" });
    }
    if (!passwordRegex.test(password)) {
      return res.status(403).json({
        error: "Password must be 6 to 20 characters long",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json(formatUserDatatoSend(newUser));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Signin Route
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.status(200).json(formatUserDatatoSend(user));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get Userprofile
export const getUserData = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};
