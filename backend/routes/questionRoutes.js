const express = require("express");
const router = express.Router();
const { postQuestion } = require("../Controllers/questionController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, postQuestion); 

module.exports = router;
