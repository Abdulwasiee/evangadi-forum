const { getConnection } = require("../dataBase/dataBase");

// Post a question
const postQuestion = async (req, res) => {
  const { description, title, tag } = req.body;
  const userId = req.user.id; // Assuming the user is authenticated and user ID is available

  if (!description || !title) {
    return res.status(400).json({ msg: "Description and title are required" });
  }

  try {
    const questionId = `Q${Date.now()}`; // Simple unique ID generation using current time
    const insertQuestionQuery = `
      INSERT INTO question (questionid, title, description, tag, user_id) 
      VALUES (?, ?, ?, ?, ?)`;
    await getConnection().query(insertQuestionQuery, [
      questionId,
      title,
      description,
      tag || null, // Use null if tag is not provided
      userId,
    ]);

    res.status(201).json({
      msg: "Question posted successfully",
      questionid: questionId,
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
    const query = "SELECT * FROM question";
    const [rows] = await getConnection().query(query);

    res.status(200).json({
      msg: "Questions fetched successfully",
      questions: rows,
    });
  } catch (error) {
    console.error("Error fetching questions:", error.message);
    res.status(500).json({
      msg: "Server error",
      error: error.message, // Provide more detail for debugging
    });
  }
};

module.exports = { postQuestion, getAllQuestions };
