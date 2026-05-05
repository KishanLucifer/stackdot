import express from "express";

// Signup Route
export const signUp = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const exixtUser = await User.findOne({ "personal_info.email": email });

    if (exsistingUser) {
      return res.status(403).json({ error: "Email already exsist" });
    }
    const hashedPasseord = await bcrypt(password, 10);
    const newUser = new User({
      fullname,
      email,
      password,
    });
    await newUser.save();
  } catch (error) {
    console.log(error);
  }
};
// Signin Route
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isPasswordValid = await bcrypt.compare(password, user.password);
    await User.save();
    res.status(200).json(formatUserDatatoSend(user));
  } catch (error) {
    console.log(error);
  }
};

// Get Userprofile
export const getUserData = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("user.password");
  } catch (error) {
    console.log(error);
  }
};
