const express = require("express");
const router = express.Router();
const { postQuestion } = require("../Controllers/questionController");
const authMiddleware = require("../middlewire/auth");

router.post("/", authMiddleware, postQuestion); 

module.exports = router;
