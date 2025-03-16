const router = require('express').Router();
const User = require('../models/User.model');



// POST /user/user - Create a new user
router.post('/user', (req, res, next) => {
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

//Add query parameters for pagination. Get all users       ** ADMIN ONLY

router.get('/users', (req, res, next) => {
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

// GET /user/user/:userId - Get a specific user
router.get('/user/:userId', (req, res, next) => {
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

// PUT /user/user/:userId - Update a specific user
router.put('/user/:userId', (req, res, next) => {
  const { userId } = req.params;
  const { email, password, name, avatarUrl, bio, favoriteFood } = req.body;
  
  User.findByIdAndUpdate(
    userId, 
    { email, password, name, avatarUrl, bio, favoriteFood}, 
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

// DELETE /users/users/:userId - Delete a specific user
router.delete('/user/:userId', (req, res, next) => {
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