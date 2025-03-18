// middlewares/role.middleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User.model'); // Import the User model


const isAuth = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Obtenemos el token de la cabecera
  if (!token) {
      return res.status(401).json({ message: "No token provided" });
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
          return res.status(401).json({ message: "Token is not valid" });
      }
      req.user = decoded; // Decodificamos el token y guardamos los datos del usuario en `req.user`
      next();
  });
};


// Middleware to check if the user has the admin role
const isAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get token from the Authorization header
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET); // Replace with your JWT secret
    req.user = decodedToken; // Store decoded user info in the request object

    // Check if the user role is 'admin'
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    next(); // User is admin, proceed to the next middleware/route handler
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = {isAdmin, isAuth};
