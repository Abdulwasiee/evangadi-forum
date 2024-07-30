const express = require("express");
const router = express.Router();

app.post("/api/user/register", async (req, res) => {
  res.send("Register endpoint");
});

app.post("/api/user/signin", (req, res) => {
  res.send("Sign in endpoint");
  // Add sign-in logic here
});

app.get("/api/user/check", (req, res) => {
  res.send("checking endpoint");
  // Add sign-in logic here
});
module.exports = router;
