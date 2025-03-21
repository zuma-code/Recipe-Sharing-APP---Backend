// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db/index");
require("./models/User.model");
require("./models/Recipe.model");
require("./models/Comment.model");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const recipeRouter= require('./routes/recipe.routes');
app.use('/recipe', recipeRouter);

const userRouter= require('./routes/user.routes');
app.use('/user', userRouter);

const commentRouter = require('./routes/comment.routes');
app.use('/comment', commentRouter); 


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
