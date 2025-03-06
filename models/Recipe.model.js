const { Schema, model, mongoose } = require("mongoose");


const recipeSchema = new Schema(
{
    title:{
        type:String,
        required:[true, "Title is required"],
        unique: false,
        trim: true,
        },
    cuisine: {
         type: String,
         required: true,
         trim: true
        },
    level:
         { type: String,
         enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"] 
        },
    duration:
        { type: Number,
         min: 0,
         required: true,
         trim: true,
        },

    ingredients:{
        type:[String],
        required:[true, "Ingredients are required"],
        trim: true
    },
      
    instructions:{
        type:[String],
        required:[true, "Description is required"],
   },
   image: { 
         type: String,
         default: "https://images.media-allrecipes.com/images/75131.jpg"
          },
          author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Author is required"],
          },
  createdAt: {
         type: Date,
         default: Date.now }
  },
  
);

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports= Recipe;