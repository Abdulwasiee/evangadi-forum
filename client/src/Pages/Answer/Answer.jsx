import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import "./Answer.css";
import Layout from "../../components/Layout/Layout";

const AnswerPage = () => {
  const { questionId } = useParams();
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");
  const [question, setQuestion] = useState(null);

  // Fetch question and answers for the specific question
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [questionResponse, answersResponse] = await Promise.all([
          axios.get(`http://localhost:2000/api/question/${questionId}`),
          axios.get(`http://localhost:2000/api/answer/${questionId}`),
        ]);

        if (questionResponse.data.question) {
          setQuestion(questionResponse.data.question);
        }

        if (answersResponse.data.answers) {
          // Sort answers to show the latest one on top
          const sortedAnswers = answersResponse.data.answers.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          setAnswers(sortedAnswers);
          setError(null);
        } else {
          setError(answersResponse.data.msg || "Unexpected response format");
        }
      } catch (err) {
        const errorMsg = err.response?.data?.msg || "Failed to fetch data";
        setError(errorMsg);
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [questionId]);

  // Check if user is authenticated and get username
  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (token) {
          const response = await axios.get(
            "http://localhost:2000/api/user/checkUser",
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );
          setUserName(response.data.user.username);
        }
      } catch (err) {
        console.error("Error checking user:", err);
      }
    };

    checkUser();
  }, []);

  // Handle change in the answer input field
  const handleAnswerChange = (event) => {
    setNewAnswer(event.target.value);
  };

  // Handle form submission to post a new answer
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      if (token) {
        await axios.post(
          "http://localhost:2000/api/answer",
          { questionid: questionId, answer: newAnswer },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setNewAnswer("");
        // Refresh the answers after posting a new one
        const fetchAnswersResponse = await axios.get(
          `http://localhost:2000/api/answer/${questionId}`
        );
        if (fetchAnswersResponse.data.answers) {
          const sortedAnswers = fetchAnswersResponse.data.answers.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          setAnswers(sortedAnswers);
          setError(null);
        } else {
          setError(
            fetchAnswersResponse.data.msg || "Unexpected response format"
          );
        }
      }
    } catch (err) {
      const errorMsg = err.response?.data?.msg || "Failed to post answer";
      setError(errorMsg);
      console.error("Error posting answer:", err);
    }
  };

  // Calculate time ago only if question is set
  const timeAgo = question
    ? formatDistanceToNow(new Date(question.created_at), { addSuffix: true })
    : "";

  return (
    <Layout>
      <div className="answer-page">
        <div className="question-Container">
          <h1>Question</h1>
          {question ? (
            <>
              <h2 className="question-title">Title: {question.title}</h2>
              <p>{question.description}</p>
              <small>{timeAgo}</small>
            </>
          ) : (
            <p>Loading question...</p>
          )}
        </div>
        <hr />
        <h1 className="from-community">Answer from Community</h1>
        {error && <p className="error-message">{error}</p>}
        <ul className="answers-list">
          {answers.length > 0 ? (
            answers.map((answer) => (
              <li key={answer.id} className="answer-item">
                <FaUserCircle className="profile-icon" />
                <div className="answer-details">
                  <span className="answer-text">{answer.answer}</span>
                  <span className="answer-provider">
                    {answer.firstname} {answer.lastname}
                  </span>
                </div>
              </li>
            ))
          ) : (
            <p>No answers available</p>
          )}
        </ul>
        {userName && (
          <form onSubmit={handleSubmit} className="answer-form">
            <textarea
              value={newAnswer}
              onChange={handleAnswerChange}
              placeholder="Write your answer here..."
              required
            />
            <button type="submit">Submit Answer</button>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default AnswerPage;
