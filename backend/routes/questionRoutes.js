const express = require("express");
const router = express.Router();
const {
  postQuestion,
  getAllQuestions,
  getQuestionById,
} = require("../Controllers/questionController");
const authMiddleware = require("../middlewire/auth");

router.post("/post", authMiddleware, postQuestion);
router.get("/get", getAllQuestions);
router.get("/:questionId", getQuestionById);

module.exports = router;
