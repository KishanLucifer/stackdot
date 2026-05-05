import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minlength: [3, "Must be 3 leter long"],
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: String,
});

export default mongoose.model("users", UserSchema);
