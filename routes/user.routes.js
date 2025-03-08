const router = require('express').Router();
const User = require('../models/User.model');

// POST /api/users - Create a new user
router.post('/users', (req, res, next) => {
  const { email, password, name, avatarUrl} = req.body;
  
  if (!email || !password || !name) {
    return res.status(400).json({ message: "All required fields must be filled." });
  }
   
  User.create({ email, password, name, avatarUrl })
    .then((response) => res.json(response))
    .catch((err) => {
      console.log("Error while creating the user", err);
      res.status(500).json({ message: "Error while creating the user" });
    });
});

// GET /api/users - Get all users
router.get('/users', (req, res, next) => {
  User.find()
    .then((allUsers) => res.json(allUsers))
    .catch((err) => {
      console.log("Error while getting all users", err);
      res.status(500).json({ message: "Error while getting all users" });
    });
});

// GET /api/users/:userId - Get a specific user
router.get('/users/:userId', (req, res, next) => {
  const { userId } = req.params;
  
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    })
    .catch((err) => {
      console.log("Error while getting a specific user", err);
      res.status(500).json({ message: "Error while getting a specific user" });
    });
});

// PUT /api/users/:userId - Update a specific user
router.put('/users/:userId', (req, res, next) => {
  const { userId } = req.params;
  const { email, password, name, avatarUrl, location } = req.body;
  
  User.findByIdAndUpdate(
    userId, 
    { email, password, name, avatarUrl, location }, 
    { new: true } // This option returns the updated document
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(updatedUser);
    })
    .catch((err) => {
      console.log("Error while updating the user", err);
      res.status(500).json({ message: "Error while updating the user" });
    });
});

// DELETE /api/users/:userId - Delete a specific user
router.delete('/users/:userId', (req, res, next) => {
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