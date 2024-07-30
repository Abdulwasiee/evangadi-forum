const express = require("express");
const mysql = require("mysql2");

const myConnection = mysql.createPool({
  host: "localhost",
  user: "Abdu",
  password: "123456",
  database: "evangadi-forum",
});
myConnection.getConnection((err) => {
  if (err) console.log(err);
  else console.log("Connected to MySQL server");
});

const userTable = `CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
)`;

const questionTable = `CREATE TABLE question (
    id INT AUTO_INCREMENT PRIMARY KEY,
    questionid VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    tag VARCHAR(50),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id)
)`;

const answerTable = `CREATE TABLE answer (
    id VARCHAR(100) NOT NULL PRIMARY KEY,
    questionid VARCHAR(100) NOT NULL,
    user_id INT NOT NULL,
    answer TEXT NOT NULL,
    FOREIGN KEY (questionid) REFERENCES question(questionid),
    FOREIGN KEY (user_id) REFERENCES user(id)
)`;

