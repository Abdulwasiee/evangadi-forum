import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { axiosInstance } from "../../utility/axios";
import Layout from "../../components/Layout/Layout";
import Question from "../../components/QuestionList/Question";
import { FaUserCircle, FaEdit, FaTrash } from "react-icons/fa";
import "./Home.css";

function Home() {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState(""); // Track the current user's ID
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status
  const [confirmDelete, setConfirmDelete] = useState(false); // State to show confirmation dialog
  const [questionToDelete, setQuestionToDelete] = useState(null); // Question ID to be deleted

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axiosInstance.get("/api/question/get");
        const sortedQuestions = response.data.questions.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setQuestions(sortedQuestions);
        setFilteredQuestions(sortedQuestions);
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
          const response = await axiosInstance.get("/api/user/checkUser", {
            headers: {
              Authorization: `${token}`,
            },
          });

          setUserName(response.data.user.username);
          setUserId(response.data.user.id); // Set the current user's ID
          setIsAuthenticated(true); // User is authenticated
        } else {
          setIsAuthenticated(false); // User is not authenticated
        }
      } catch (err) {
        console.error("Error checking user:", err);
        setIsAuthenticated(false); // Error checking user means not authenticated
      }
    };

    checkUser();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEdit = (questionId) => {
    navigate(`/editQuestion/${questionId}`);
  };

  const handleDelete = (questionId) => {
    setQuestionToDelete(questionId);
    setConfirmDelete(true); // Show confirmation dialog
  };

  const confirmDeleteAction = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No authentication token found");
      return;
    }

    try {
      await axiosInstance.delete(`/api/question/${questionToDelete}`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      // Remove the deleted question from the state
      setQuestions(questions.filter((q) => q.questionid !== questionToDelete));
      setFilteredQuestions(
        filteredQuestions.filter((q) => q.questionid !== questionToDelete)
      );
      setConfirmDelete(false); // Hide confirmation dialog
      setQuestionToDelete(null); // Reset question to delete
    } catch (err) {
      console.error("Error deleting question:", err);
      setError("Failed to delete question");
    }
  };

  const cancelDeleteAction = () => {
    setConfirmDelete(false); // Hide confirmation dialog
    setQuestionToDelete(null); // Reset question to delete
  };

  return (
    <Layout>
      <div className="questions-container">
        <section className="header">
          <Link to="/postQuestion">
            <button className="ask">Ask Question</button>
          </Link>
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
            <li key={question.questionid} className="question-item">
              <Question question={question} />
              <div className="action-buttons">
                {isAuthenticated && (
                  <>
                    {userId === question.user_id && ( // Check if user is authenticated and is the owner of the question
                      <>
                        <FaEdit
                          className="edit-icon"
                          onClick={() => handleEdit(question.questionid)}
                        />
                        <FaTrash
                          className="delete-icon"
                          onClick={() => handleDelete(question.questionid)}
                        />
                      </>
                    )}
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>

        {confirmDelete && (
          <div className="confirmation-dialog">
            <div className="confirmation-dialog-content">
              <h3>Confirm Deletion</h3>
              <p>Are you sure you want to delete this question?</p>
              <div className="confirmation-buttons">
                <button
                  className="confirm-button"
                  onClick={confirmDeleteAction}
                >
                  Confirm
                </button>
                <button className="cancel-button" onClick={cancelDeleteAction}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Home;
