const { getConnection } = require("../dataBase/dataBase");

const postQuestion = async (req, res) => {
  const { description, title, tag } = req.body;
  const userId = req.user.id;

  if (!description || !title) {
    return res.status(400).json({ msg: "Description and title are required" });
  }

  try {
    const questionId = `Q${Date.now()}`;
    const currentTimestamp = new Date();

    const insertQuestionQuery = `
      INSERT INTO question (questionid, title, description, tag, user_id, created_at) 
      VALUES (?, ?, ?, ?, ?, ?)`;

    await getConnection().query(insertQuestionQuery, [
      questionId,
      title,
      description,
      tag || null,
      userId,
      currentTimestamp,
    ]);

    res.status(201).json({
      msg: "Question posted successfully",
      questionid: questionId,
      created_at: currentTimestamp,
    });
  } catch (error) {
    console.error("Error posting question:", error.message);
    res.status(500).json({
      msg: "Server error",
      error: error.message,
    });
  }
};

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

const getQuestionById = async (req, res) => {
  const questionId = req.params.questionId;

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
      return res.status(404).json({
        msg: "Question not found",
      });
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
