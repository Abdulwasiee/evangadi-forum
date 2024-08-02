const express = require("express");
const router = express.Router();
const {
  postQuestion,
  getAllQuestions,
} = require("../Controllers/questionController");
const authMiddleware = require("../middlewire/auth");


router.post("/post", authMiddleware, postQuestion);


router.get("/get", getAllQuestions);

module.exports = router;
