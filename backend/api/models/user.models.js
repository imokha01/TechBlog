import mongoose from "mongoose";

//! Configure the user schema (user login conditions)
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, //means username must be unique to every user
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {timestamps: true}
); 

//! Create the User model
const User = mongoose.model("User", userSchema);

export default User;