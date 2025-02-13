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
  profilePicture: {
    type: String,
    default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png", //default profile picture
  }
}, {timestamps: true} // timestamp is used to track the time of creation and update of the user.
); 

//! Create the User model
const User = mongoose.model("User", userSchema);

export default User;




//! NOTE ON USER MODEL:
/**
  - User Model is a core component that represents the data and behavior related to users of the application.
  -   It is typically a structured representation (often as a class or database table) that defines the attributes, relationships, and methods associated with a user.

  //TODO what the User Model typically includes:
  // ? 1. Attributes: 
          Properties or data fields that describe the user, such as username, email, password, id, name, roles/permissions, status, timestamps, etc.

 //? 2. Relationships: 
          Connects other models to the User model, such as one-to-many (e.g., User has many Posts), many-to-many (e.g., User has many Roles), or many-to-one (e.g., User has one Profile).

 //? 3. Methods: 
          Functions that perform actions on the User model, such as creating a new user, updating a user's information, deleting a user, etc.

//?  4. Database Representation: 
          In a database, the User Model is typically represented as a table. Each row in the table represents a user, and each column represents an attribute of the user.

//? 5. Use Cases:
          The User Model is used in various scenarios, such as:
         //! - Authentication: 
              Logging user in and out of the application.
          //! - Registration: 
              Creating new user accounts.
          //! - Profile Management: 
              Updating user information. 
          //! Authorizations: 
              Checking if a user has permission to perform certain actions.
          //! Analytics: 
              Tracking user activity and behavior.
*/