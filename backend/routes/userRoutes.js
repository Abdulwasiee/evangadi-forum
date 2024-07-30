const express = require("express");
const router = express.Router();
const { register, signIn, checkUser } = require("../Controller/controler");

// Define routes and map them to their handlers
router.post("/register", register);
router.post("/signin", signIn);
router.get("/check", checkUser);

module.exports = router;
