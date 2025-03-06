const router = require('express').Router();
const User = require('../models/User.model');

//  POST /api/users  -  Creates a new user
router.post('/users', (req, res, next) => {
    const { email, password, name, avatarUrl, location } = req.body;
    
    if (!email || !password || !name) {
        return res.status(400).json({ message: "All required fields must be filled." });
      }
      
   User.create({email, password, name, avatarUrl, location })
      .then((response) => res.json(response))
      .catch((err) => {
        console.log("Error while creating the user", err);
        res.status(500).json({ message: "Error while creating the user" });
      });
  });
   
  module.exports = router;