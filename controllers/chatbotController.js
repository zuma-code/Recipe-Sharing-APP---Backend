const { body, validationResult } = require("express-validator");


// Validation and sanitation middleware
const validateChatbotInput = [
  body("message")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Message cannot be empty"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Chatbot controller function
const chatbotHandler = async (req, res) => {
  try {
    const userMessage = req.body.message;

    // Call n8n API for processing (mock example)
    const botResponse = `You said: ${userMessage}`; // Replace with actual n8n API call

    res.json({ response: botResponse });
  } catch (error) {
    console.error("Chatbot error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { chatbotLimiter, validateChatbotInput, chatbotHandler };
