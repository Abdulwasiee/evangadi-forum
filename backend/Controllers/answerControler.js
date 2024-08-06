const { getConnection } = require("../dataBase/dataBase");

const postAnswer = async (req, res) => {
  const { answer, questionid } = req.body;
  const userId = req.user.id;

  if (!answer || !questionid) {
    return res.status(400).json({ msg: "Answer and question ID are required" });
  }

  try {
    const answerId = `A${Date.now()}`;
    const currentTimestamp = new Date();

    const insertAnswerQuery = `
      INSERT INTO answer (id, questionid, user_id, answer, created_at)
      VALUES (?, ?, ?, ?, ?)`;

    await getConnection().query(insertAnswerQuery, [
      answerId,
      questionid,
      userId,
      answer,
      currentTimestamp,
    ]);

    res.status(201).json({
      msg: "Answer posted successfully",
      answerid: answerId,
      created_at: currentTimestamp,
    });
  } catch (error) {
    console.error("Error posting answer:", error.message);
    res.status(500).json({
      msg: "Server error",
      error: error.message,
    });
  }
};

const getAnswersForQuestion = async (req, res) => {
  const questionId = req.params.questionid;

  try {
    const query = `
      SELECT answer.id, answer.answer, answer.created_at,
             user.firstname, user.lastname
      FROM answer
      JOIN user ON answer.user_id = user.id
      WHERE answer.questionid = ?
    `;
    const [rows] = await getConnection().query(query, [questionId]);

    res.status(200).json({
      msg: "Answers fetched successfully",
      answers: rows,
    });
  } catch (error) {
    console.error("Error fetching answers:", error.message);
    res.status(500).json({
      msg: "Server error",
      error: error.message,
    });
  }
};

const getAnswersSingleForQuestion = async (req, res) => {
  const answerId = req.params.answerid;

  try {
    const query = `
      SELECT answer.id, answer.answer, answer.created_at,
             user.firstname, user.lastname
      FROM answer
      JOIN user ON answer.user_id = user.id
      WHERE answer.id = ?
    `;
    const [rows] = await getConnection().query(query, [answerId]);

    if (rows.length === 0) {
      return res.status(404).json({
        msg: "Answer not found",
      });
    }

    res.status(200).json({
      msg: "Answer fetched successfully",
      answer: rows[0],
    });
  } catch (error) {
    console.error("Error fetching answer:", error.message);
    res.status(500).json({
      msg: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  postAnswer,
  getAnswersForQuestion,
  getAnswersSingleForQuestion,
};
