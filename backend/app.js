const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const questionRouter = require("./routes/questionRoutes");
const answerRouter = require("./routes/answerRoute");
const { createTables, getConnection } = require("./dataBase/dataBase");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"], 
  })
);


app.use("/api/user", userRouter);
app.use("/api/question", questionRouter);
app.use("/api/answer", answerRouter); 

const port = 2000;

const start = async () => {
  try {
    // Test the connection
    const [rows] = await getConnection().query('SELECT "test"');
    console.log("Database connection established:", rows);

    // Create tables
    await createTables();

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (err) {
    console.error("Error:", err.message);
  }
};

start();
