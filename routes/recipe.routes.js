const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe.model");
const { isAuth, isAdmin } = require("../middleware/role.middleware");

//  POST /recipe/recipes  -  Creates a new recipe
router.post("/recipes", isAuth, (req, res, next) => {
  const {
    title,
    cuisine,
    dishType,
    level,
    duration,
    servings,
    ingredients,
    instructions,
    image,
    author,
  } = req.body;

  if (
    !title ||
    !cuisine ||
    !dishType ||
    !level ||
    !servings ||
    !ingredients ||
    !instructions
  ) {
    return res
      .status(400)
      .json({ message: "All required fields must be filled." });
  }

  Recipe.create({
    title,
    cuisine,
    dishType,
    level,
    duration,
    servings,
    ingredients,
    instructions,
    image: image || "https://images.media-allrecipes.com/images/75131.jpg", // Default image if missing
    author,
  })
    .then((response) => res.json(response))
    .catch((err) => {
      console.log("Error while creating the recipe", err.message);
      res.status(500).json({ message: "Error while creating the recipe" });
    });
});

// GET /recipe/recipes - Get all recipes
router.get("/recipes", (req, res, next) => {
  Recipe.find({})
    .then((allRecipes) => res.json(allRecipes))
    .catch((err) => {
      console.log("Error while getting all recipes", err.message);
      res.status(500).json({ message: "Error while getting all recipes" });
    });
});

// GET /recipe/recipes/:recipeId - Get a specific recipe
router.get("/recipes/:recipeId", (req, res, next) => {
  const { recipeId } = req.params;

  Recipe.findById(recipeId)
    .populate("author", "name") // Populate author details
    .then((recipe) => {
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      res.json(recipe);
    })
    .catch((err) => {
      console.log("Error while getting a specific recipe", err.message);
      res
        .status(500)
        .json({ message: "Error while getting a specific recipe" });
    });
});

// PUT /api/recipes/:recipeId - Update a specific recipe
router.put("/recipes/:recipeId", isAuth, (req, res, next) => {
  const { recipeId } = req.params;
  const {
    title,
    cuisine,
    dishType,
    level,
    duration,
    servings,
    ingredients,
    instructions,
    image,
    author,
  } = req.body;

  Recipe.findByIdAndUpdate(
    recipeId,
    {
      title,
      cuisine,
      dishType,
      level,
      duration,
      servings,
      ingredients,
      instructions,
      image,
      author,
    },
    { new: true } // This option returns the updated document
  )
    .then((updatedRecipe) => {
      if (!updatedRecipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      res.json(updatedRecipe);
    })
    .catch((err) => {
      console.log("Error while updating the recipe", err.message);
      res.status(500).json({ message: "Error while updating the recipe" });
    });
});

// DELETE /api/recipes/:recipeId - Delete a specific recipe
router.delete("/recipes/:recipeId", isAuth, isAdmin, (req, res, next) => {
  const { recipeId } = req.params;

  Recipe.findByIdAndDelete(recipeId)
    .then((deletedRecipe) => {
      if (!deletedRecipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      res.json({ message: "Recipe deleted successfully" });
    })
    .catch((err) => {
      console.log("Error while deleting the recipe", err.message);
      res.status(500).json({ message: "Error while deleting the recipe" });
    });
});

module.exports = router;
