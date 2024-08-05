const { getConnection } = require("../database/database"); // Ensure correct path and function

// Post an answer
const postAnswer = async (req, res) => {
  const { questionid, answer } = req.body;
  const userId = req.user.id; // Ensure user ID is available

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
      return res.status(404).json({ msg: "Question not found" });
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
    res.status(500).json({ msg: "Server error", error: error.message }); // Include error message for debugging
  }
};

// Get all answers for a specific question, including provider names
const getAnswersForQuestion = async (req, res) => {
  const { questionid } = req.params;

  if (!questionid) {
    return res.status(400).json({ msg: "Question ID is required" });
  }

  try {
    const query = `
      SELECT a.id, a.questionid, a.answer, a.user_id, u.firstname, u.lastname
      FROM answer a
      JOIN user u ON a.user_id = u.id
      WHERE a.questionid = ?
    `;

    const [rows] = await getConnection().query(query, [questionid]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ msg: "No answers found for this question" });
    }

    res.status(200).json({ answers: rows });
  } catch (error) {
    console.error("Error retrieving answers:", error.message);
    res.status(500).json({ msg: "Server error", error: error.message }); // Include error message for debugging
  }
};

// Get a single answer by ID, including provider name
const getAnswersSingleForQuestion = async (req, res) => {
  const { answerid } = req.params;

  if (!answerid) {
    return res.status(400).json({ msg: "Answer ID is required" });
  }

  try {
    const query = `
      SELECT a.id, a.questionid, a.answer, a.user_id, u.firstname, u.lastname
      FROM answer a
      JOIN user u ON a.user_id = u.id
      WHERE a.id = ?
    `;

    const [rows] = await getConnection().query(query, [answerid]);

    if (rows.length === 0) {
      return res.status(404).json({ msg: "No answers found with this ID" });
    }

    res.status(200).json({ answer: rows[0] });
  } catch (error) {
    console.error("Error retrieving answer:", error.message);
    res.status(500).json({ msg: "Server error", error: error.message }); // Include error message for debugging
  }
};

module.exports = {
  postAnswer,
  getAnswersForQuestion,
  getAnswersSingleForQuestion,
};
