// routes/questionRoutes.js
const express = require("express");
const router = express.Router();
const {
  postQuestion,
  getAllQuestions,
  getQuestionById, // Add this
} = require("../Controllers/questionController");
const authMiddleware = require("../middlewire/auth");

router.post("/post", authMiddleware, postQuestion);
router.get("/get", getAllQuestions);
router.get("/:questionId", getQuestionById); // Add this

module.exports = router;
