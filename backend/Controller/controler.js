const bcrypt = require("bcrypt");
const { getConnection } = require("../dataBase/dataBase");

const register = async (req, res) => {
  const { username, email, firstname, lastname, password } = req.body;

  if (!username || !email || !firstname || !lastname || !password) {        
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const [rows] = await getConnection().query(
      "SELECT username FROM user WHERE username = ? OR email = ?",
      [username, email]
    );

    if (rows.length > 0) {
      return res.status(400).json({ msg: "User already registered" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ msg: "Password must be at least 8 characters long" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const insertUserQuery = `INSERT INTO user (username, email, firstname, lastname, password) VALUES (?, ?, ?, ?, ?)`;
    await getConnection().query(insertUserQuery, [
      username,
      email,
      firstname,
      lastname,
      hashedPassword,
    ]);

    res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    console.error("Error inserting user:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

const signIn = async (req, res) => {
  res.send("Sign in endpoint");
  // Add sign-in logic here
};

const checkUser = async (req, res) => {
  res.send("Checking endpoint");
  // Add checking logic here
};

module.exports = { register, signIn, checkUser };
