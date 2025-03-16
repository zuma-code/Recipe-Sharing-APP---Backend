const router = require('express').Router();
const Comment = require('../models/Comment.model');
const Recipe = require("../models/Recipe.model");

//  POST /comment/comments  -  Creates a new comment
router.post('/comments', (req, res, next) => {
    const {user, recipe, text } = req.body;
    
   /* if (!user || !recipe  || !text) {
        return res.status(400).json({ message: "All required fields must be filled." });
      }*/
      
    Comment.create({ user, recipe, text })
      .then((response) => res.json(response))
      .catch((err) => {
        console.log("Error while creating the comment", err.message);
        res.status(500).json({ message: "Error while creating the comment" });
      });
  });

  // ✅ Get All Comments for a Recipe
router.get("/:recipeId", async (req, res) => {
    try {
      const { recipeId } = req.params;
      
      const comments = await Comment.find({ recipe: recipeId })
        .populate("user", "name avatarUrl") // Populate user details (name & avatar)
        .sort({ createdAt: -1 }); // Sort by newest first
  
      res.json(comments);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  
  // ✅ Delete a Comment  **  ADMIN ONLY
  router.delete("/:commentId", async (req, res) => {
    try {
      const { commentId } = req.params;
  
      const deletedComment = await Comment.findByIdAndDelete(commentId);
  
      if (!deletedComment) {
        return res.status(404).json({ error: "Comment not found" });
      }
  
      res.json({ message: "Comment deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  module.exports = router;
  
  




