import User from "../models/user.model.js";
import colors from "colors";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

//TODO Signup Controller
export const signup = async (req, res, next) => {
  //! Validate the request body data
  const { username, email, password } = req.body;

  try {
    // ! Check if all fields are provided
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

    //! Create a new user with the given username, email and password
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    //! Save the new user to the database
    await newUser.save();

    //!send success response
    res.json({ message: "signup successful" });
    console.log("User created successfully".green.bold);
  } catch (error) {
    //! Handle errors
    next(error);
  }
};

//TODO Signin Controller
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  //! Check if all fields are provided
  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    //! Validate the User email
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "Wrong email address or password"));
    }

    //! Validate the User password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong email address or password"));
    }

    //! Authenticate the user using JWT(JSON Web Token)
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    //! Remove the password from the user data
    const { password: pass, ...rest } = validUser._doc;

    //! Send the response with the token
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

//TODO GOOGLE Controller
export const google = async (req, res, next) => {
  //! Get the User email address, name and google photo URL from the server request.
  const { email, name, googlePhotoURL } = req.body;

  try {
    //! Check if the user exists in the database?
    const user = await User.findOne({ email });

    if (user) {
      // Authenticate the user using JWT(JSON Web Token)
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      // Remove the google password from the user data
      const { password: pass, ...rest } = user._doc;

      // Send the response with the token
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true
        })
        .json(rest);
    } else {
      //! Create a password for the user
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      // Create a new user with the given username, email, password
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoURL
      });

      // Save the new user to the database
      await newUser.save();

      // Authenticate the user using JWT(JSON Web Token)
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      // Remove the password from the user data
      const { password: pass, ...rest } = newUser._doc;

      // Send the response with the token
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
