const router = require('express').Router();
const Recipe = require('../models/Recipe.model');

//  POST /api/recipes  -  Creates a new recipe
router.post('/recipes', (req, res, next) => {
    const { title, cuisine, level, duration, ingredients, instructions, image, author } = req.body;
    
    if (!title || !cuisine || !duration || !ingredients || !instructions) {
        return res.status(400).json({ message: "All required fields must be filled." });
      }
      
    Recipe.create({ title, cuisine, level, duration, ingredients, instructions, image, author })
      .then((response) => res.json(response))
      .catch((err) => {
        console.log("Error while creating the recipe", err.message);
        res.status(500).json({ message: "Error while creating the recipe" });
      });
  });
   
  module.exports = router;





