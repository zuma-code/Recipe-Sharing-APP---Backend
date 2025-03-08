const mongoose = require("mongoose");
const { Schema, model } = mongoose;


const recipeSchema = new Schema(
{
    title:{
        type:String,
        required:[true, "Title is required"],
        trim: true,
        },
    cuisine: {
         type: String,
         required: [true, "Cuisine is required"],
         trim: true
        },
    dishType: {
            type: String,
            enum: ["Vegetarian", "Vegan", "Meat", "Fish", "Seafood", "Dessert", "Other"],
            required: true,
          },

    level:
         { type: String,
         enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
         required: [true, "Level is required"],
        },
    duration:
        { type: Number,
         min: 0,       
        required: [true, "Duration is required"],
       
        },
    servings:
        { type: Number,
         min: 1,       
        required: [true, "Servings are required"],
        },

    ingredients:{
        type:[String],
        required:[true, "Ingredients are required"],
    },
      
    instructions:{
        type:[String],
        required:[true, "Instructions are required"],
   },
   image: { 
         type: String,
         default: "https://images.media-allrecipes.com/images/75131.jpg",
        
        },
    author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Author is required"],
          },
        
  },
  { timestamps: true } // This adds createdAt & updatedAt automatically
);

const Recipe = model("Recipe", recipeSchema);
module.exports= Recipe;