const { Schema, model } = require("mongoose");

const recipeSchema = new Schema(
{
    title:{
        type:String,
        required:[true, "Title is required"],
        lowercase: true,
        trim: true,
    
    },
    description:{
        type:String,
        required:[true, "Description is required"],
   },
   instructions:{
        type:[String],
        required:[true, "Description is required"],
   },
   imageUrl: { 
        type: String,
         required: false }, // URL of the image
  author: {
     type: mongoose.Schema.Types.ObjectId,
      ref: "User", required: true },
  createdAt: {
     type: Date,
      default: Date.now }
  },
   {
    timestamps: true,
    } 
);

const Recipe = model("Recipe", recipeSchema);
module.expoers= Recipe;