import User from "../models/user.model.js";
import colors from "colors";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

//IDEA: SIGNUP CONTROLLER
export const signup = async (req, res, next) => {
  //* 1. Extract the username, email, password from the request
  const { username, email, password } = req.body;

  try {
  //* 2. Check if all fields are not provided and return error
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

    //* 3. Encrypt the password using bcrypt before saving to the database
    const hashedPassword = bcryptjs.hashSync(password, 10);

    //* 4. Create a new user with the given username, email and password
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

    //! Handle errors
  } catch (error) {
    next(error);
  }
};

//IDEA: SIGNIN CONTROLLER
export const signin = async (req, res, next) => {
  //! 1. Extract User email and Password from request
  const { email, password } = req.body;

  //! 2. Check if all fields are provided
  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    //! 3. Validate the User by their email
    const validUser = await User.findOne({ email });
    console.log(validUser);
    if (!validUser) {
      return next(errorHandler(404, "Wrong email address or password"));
    }

    //! 4. Validate the User password by comparing the password giving with the hashed password in the database
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong email address or password"));
    }

    //! 5. Authenticate the user using JWT(JSON Web Token)
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    //! 6. Remove the password from the user data
    const { password: pass, ...rest } = validUser._doc;

    //! 7. Send the response with the token
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true
      })
      .json(rest);

    //! 8. Handle errors
  } catch (error) {
    next(error);
  }
};

//IDEA: GOOGLE CONTROLLER
export const google = async (req, res, next) => {
  //! Get the User email address, name and google photo URL from the server request.
  const { email, name, googlePhotoURL } = req.body;

  try {
    //! Check if the user with the email exists in the database?
    const user = await User.findOne({ email });

    //! if user exists, follow the Login flow
    if (user) {
      //1. Authenticate the user using JWT(JSON Web Token)
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      //2. Remove the google password from the user data
      const { password: pass, ...rest } = user._doc;

      //3. Send the user data (excluding the password) back as response.
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true
        })
        .json(rest);

      //! If User does not exist, follow the Registration Flow
    } else {
      // 1. generate a new password for the user and hash the password using bcryptjs
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      //2. Create a new user with the given username, email, password
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoURL
      });

      //3. Save the new user to the database
      await newUser.save();

      //4. Authenticate the user using JWT(JSON Web Token)
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

      //5. Remove the password from the user data
      const { password: pass, ...rest } = newUser._doc;

      //6. Send the new user data (excluding the password) as response
      res
        .status(200)
        .cookie("access_to ken", token, {
          httpOnly: true
        })
        .json(rest);
    }

    //! Handle the error
  } catch (error) {
    next(error);
  }
};
