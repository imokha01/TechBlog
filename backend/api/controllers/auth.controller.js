import User from "../models/user.model.js";
import colors from "colors";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
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
    return res.status(400).json({ error: "All fields are required" });
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
    res.status(500).json({ error: "Email or username already exists" });
  }
};
