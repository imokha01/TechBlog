//We create all logic for the user controller here
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";


export const test = (req, res) => {
  res.json({ message: "User route is connected" });
};

export const updateUser = async (req, res, next) => {

  //TODO: HANDLE THE UPDATING USER ERRORS WITH DIFFERENT CONDITIONS
    
        //* Check if the user is the same as the user being updated
        if(req.user.id !== req.params.userId){
          return next(errorHandler(401, "You are not allowed to update this user"));
        };

        //NOTE: HANDLE PASSWORD UPDATE ERRORS 
        if(req.body.password){
          //! Check if the password is 6 characters
          if(req.body.password.length < 6){ 
            return next(errorHandler(400, "Password must be at least 6 characters"));
        
          };
        //! Encode the password if present in the request body
          req.body.password = bcrypt.hashSync(req.body.password, 10);
        
        }

        //NOTE: HANDLE USERNAME UPDATE  ERRORS
        if(req.body.username){

          //! Check if the username is between 7 and 20 characters
          if(req.body.username.length < 7 || req.body.username.length > 20){
            return next(errorHandler(400, "Username must be between 7 and 20 characters"));
          }

          //! Check if the username contains spaces
            if(req.body.username.includes(" ")){
              return next(errorHandler(400, "Username must not contain spaces"));
            }
        
          //! Check if the username is lowercase
            if(req.body.username !== req.body.username.toLowerCase()){
              return next(errorHandler(400, "Username must be lowercase"));
            }

          //! Check if the username contains only letters and numbers
            if(!/^[a-zA-Z0-9]*$/.test(req.body.username)){
              return next(errorHandler(400, "Username must contain only letters and numbers"));
            }
        }

  try {
    const updateUser = await User.findByIdAndUpdate(req.params.userId,{
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        profilePicture: req.body.profilePicture
      },
    },  {new: true});
    const {password, ...rest} = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error)
  }
}