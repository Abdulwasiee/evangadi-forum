const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewire/auth");
const {
  postAnswer,
  getAnswersForQuestion,
  getAnswersSingleForQuestion,
} = require("../Controllers/answerControler");

// Route to post an answer to a specific question
router.post("/", authMiddleware, postAnswer); // Protected route

// Route to get all answers for a specific question
router.get("/:questionid", getAnswersForQuestion);

// Route to get a single answer by ID
router.get("/single/:answerid", getAnswersSingleForQuestion);

module.exports = router;
