import User from "../models/user.model.js";
import colors from "colors";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) =>{
  // Validate the request body data
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required"));
  }

  //encrypt the password before saving to the database
  const hashedPassword = bcryptjs.hashSync(password, 10);

  //Create a new user with the given username, email and password
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  //Send a success response with a message
  try {
    await newUser.save(); //Save the new user to the database
    res.json({ message: "signup successful" });
    console.log("User created successfully".green.bold);
  } catch (error) {
    console.log(error);
    next(error); //the next error is the error from the middleware
  }
};
