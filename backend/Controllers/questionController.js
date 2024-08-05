// controllers/questionController.js
const { getConnection } = require("../database/database");

// Post a question
const postQuestion = async (req, res) => {
  const { description, title, tag } = req.body;
  const userId = req.user.id; // Assuming the user is authenticated and user ID is available

  if (!description || !title) {
    return res.status(400).json({ msg: "Description and title are required" });
  }

  try {
    const questionId = `Q${Date.now()}`; // Simple unique ID generation using current time
    const currentTimestamp = new Date(); // Get the current timestamp

    const insertQuestionQuery = `
      INSERT INTO question (questionid, title, description, tag, user_id, created_at) 
      VALUES (?, ?, ?, ?, ?, ?)`;

    await getConnection().query(insertQuestionQuery, [
      questionId,
      title,
      description,
      tag || null, // Use null if tag is not provided
      userId,
      currentTimestamp, // Insert the current timestamp
    ]);

    res.status(201).json({
      msg: "Question posted successfully",
      questionid: questionId,
      created_at: currentTimestamp, // Return the timestamp in the response
    });
  } catch (error) {
    console.error("Error posting question:", error.message);
    res.status(500).json({
      msg: "Server error",
      error: error.message, // Provide more detail for debugging
    });
  }
};

// Get all questions
const getAllQuestions = async (req, res) => {
  try {
    const query = `
      SELECT question.questionid, question.title, question.description, question.tag, question.created_at,
             user.firstname, user.lastname
      FROM question
      JOIN user ON question.user_id = user.id
    `;
    const [rows] = await getConnection().query(query);

    res.status(200).json({
      msg: "Questions fetched successfully",
      questions: rows,
    });
  } catch (error) {
    console.error("Error fetching questions:", error.message);
    res.status(500).json({
      msg: "Server error",
      error: error.message,
    });
  }
};

// Get a specific question by ID
const getQuestionById = async (req, res) => {
  const { questionId } = req.params;

  if (!questionId) {
    return res.status(400).json({ msg: "Question ID is required" });
  }

  try {
    const query = `
      SELECT question.questionid, question.title, question.description, question.tag, question.created_at,
             user.firstname, user.lastname
      FROM question
      JOIN user ON question.user_id = user.id
      WHERE question.questionid = ?
    `;
    const [rows] = await getConnection().query(query, [questionId]);

    if (rows.length === 0) {
      return res.status(404).json({ msg: "Question not found" });
    }

    res.status(200).json({
      msg: "Question fetched successfully",
      question: rows[0],
    });
  } catch (error) {
    console.error("Error fetching question:", error.message);
    res.status(500).json({
      msg: "Server error",
      error: error.message,
    });
  }
};

module.exports = { postQuestion, getAllQuestions, getQuestionById };
