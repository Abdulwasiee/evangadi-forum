import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import Question from "../../components/QuestionList/Question";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./Home.css";

function Home() {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2000/api/question/get"
        );
        setQuestions(response.data.questions);
        setFilteredQuestions(response.data.questions);
      } catch (err) {
        setError("Failed to fetch questions");
        console.error("Error fetching questions:", err);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    const filtered = questions.filter(
      (question) =>
        question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (question.tag &&
          question.tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (question.firstname &&
          question.firstname.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredQuestions(filtered);
  }, [searchTerm, questions]);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (token) {
          const response = await axios.get(
            "http://localhost:2000/api/user/checkUser",
            {
              headers: {
                Authorization: token, // Use Bearer prefix
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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Layout>
      <div className="questions-container">
        <section className="header">
          <button className="ask">
            <Link to="postQuestion">Ask Question</Link>
          </button>
          <div className="user-welcome">
            <FaUserCircle className="welcome-icon" />
            <span className="user-name">
              {userName ? `Welcome, ${userName}` : "Welcome, Guest"}
            </span>
          </div>
        </section>
        <h2>Questions</h2>
        <section className="search-bar">
          <input
            type="text"
            placeholder="Search by title, tag, or asker's name..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </section>

        {error && <p className="error-message">{error}</p>}
        <ul className="questions-list">
          {filteredQuestions.map((question) => (
            <Question key={question.questionid} question={question} />
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export default Home;
