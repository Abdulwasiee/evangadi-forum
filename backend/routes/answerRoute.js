const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewire/auth");
const {
  postAnswer,
  getAnswersForQuestion,
  getAnswersSingleForQuestion,
} = require("../Controllers/answerControler");

router.post("/", authMiddleware, postAnswer); // Protected route
router.get("/:questionid", getAnswersForQuestion);
router.get("/single/:answerid", getAnswersSingleForQuestion);

module.exports = router;
