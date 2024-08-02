const { getConnection } = require("../dataBase/dataBase");

// Post an answer to a specific question
const postAnswer = async (req, res) => {
  const { questionid, answer } = req.body;
  const userId = req.user.id;
  console.log(userId); // Assuming the user is authenticated and user ID is available

  if (!questionid || !answer) {
    return res.status(400).json({ msg: "Question ID and answer are required" });
  }

  try {
    // Check if the question exists
    const [questionRows] = await getConnection().query(
      "SELECT * FROM question WHERE questionid = ?",
      [questionid]
    );

    if (questionRows.length === 0) {
      return res.status(400).json({ msg: "Question not found" });
    }

    const answerId = `A${Date.now()}`; // Simple unique ID generation using current time
    const insertAnswerQuery = `
      INSERT INTO answer (id, questionid, user_id, answer) 
      VALUES (?, ?, ?, ?)`;
    await getConnection().query(insertAnswerQuery, [
      answerId,
      questionid,
      userId,
      answer,
    ]);

    res.status(201).json({ msg: "Answer posted successfully" });
  } catch (error) {
    console.error("Error posting answer:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get all answers for a specific question
const getAnswersForQuestion = async (req, res) => {
  const { questionid } = req.params;

  if (!questionid) {
    return res.status(400).json({ msg: "Question ID is required" });
  }

  try {
    const [rows] = await getConnection().query(
      "SELECT * FROM answer WHERE questionid = ?",
      [questionid]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ msg: "No answers found for this question" });
    }

    res.status(200).json({ answers: rows });
  } catch (error) {
    console.error("Error retrieving answers:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get a single answer by ID
const getAnswersSingleForQuestion = async (req, res) => {
  const { answerid } = req.params;

  if (!answerid) {
    return res.status(400).json({ msg: "Answer ID is required" });
  }

  try {
    const [rows] = await getConnection().query(
      "SELECT * FROM answer WHERE id = ?",
      [answerid]
    );

    if (rows.length === 0) {
      return res.status(404).json({ msg: "No answers found with this ID" });
    }

    res.status(200).json({ answer: rows[0] });
  } catch (error) {
    console.error("Error retrieving answer:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  postAnswer,
  getAnswersForQuestion,
  getAnswersSingleForQuestion,
};
