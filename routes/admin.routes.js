// routes/admin.routes.js
const router = require('express').Router();
const User = require('../models/User.model');
const isAdmin = require('../middleware/role.middleware'); // Import the isAdmin middleware

// Protected route for getting all users (only accessible by admin)
router.get('/users', isAdmin, (req, res, next) => {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
  
    User.find()
      .skip(skip)
      .limit(limit)
      .then((allUsers) => res.json(allUsers))
      .catch((err) => {
        console.log("Error while getting all users", err);
        res.status(500).json({ message: "Error while getting all users" });
      });
  });
  

// Protected route for deleting a user (only accessible by admin)
router.delete('/user/:userId', isAdmin, (req, res) => {
  const { userId } = req.params;
  
  User.findByIdAndDelete(userId)
    .then((deletedUser) => {
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
    })
    .catch((err) => {
        console.log("Error while deleting the user", err);
        res.status(500).json({ message: "Error while deleting the user" });
    });       
       
});

module.exports = router;
