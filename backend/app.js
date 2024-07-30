const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:2235",
  })
);

const port = 2000;
app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log(`Server is running on port ${port}`);
});





