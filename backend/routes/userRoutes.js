const express = require("express");
const router = express.Router();
const authMiddleWare=require('../middlewire/auth')
const { register, signIn, checkUser } = require("../Controllers/userControler");

// Define routes and map them to their handlers
router.post("/register", register);
router.post("/signin", signIn);
router.get("/check",authMiddleWare, checkUser);

module.exports = router;
