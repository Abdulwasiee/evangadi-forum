const { getConnection } = require("../dataBase/dataBase");

const postQuestion = async (req, res) => {
  const { description, title } = req.body;
  const userId = req.user.id; // Assuming the user is authenticated and user ID is available

  if (!description || !title) {
    return res.status(400).json({ msg: "Description and title are required" });
  }

  try {
    const questionId = `Q${Date.now()}`; // Simple unique ID generation using current time
    const insertQuestionQuery = `INSERT INTO question (questionid, title, description, user_id) VALUES (?, ?, ?, ?)`;
    await getConnection().query(insertQuestionQuery, [
      questionId,
      title,
      description,
      userId,
    ]);

    res.status(201).json({ msg: "Question posted successfully" });
  } catch (error) {
    console.error("Error posting question:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { postQuestion };
