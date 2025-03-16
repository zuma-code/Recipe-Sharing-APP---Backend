const { Schema, model} = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    bio: {
      type: String      
    },
    favoriteFood: {
      type: String     
    },
    avatarUrl: {
      type: String,  
      default: "images/default-avatar.png"  
    },
    role: {
      type: String,
      enum: ['user', 'admin'], // Only these two roles are allowed
      default: 'user', // Default role is 'user'
    },
  }
 
);

const User = model("User", userSchema);

module.exports = User;
