import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { FaArrowRight } from "react-icons/fa";
import "./Question.css";

function QuestionPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [error, setError] = useState("");

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No authentication token found");
      setError("No authentication token found.");
      return;
    }

    console.log("Submitting question with token:", token);

    const response = await fetch("http://localhost:2000/api/question/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`, // Ensure only one "Bearer"
      },
      body: JSON.stringify({
        title,
        description,
        tag: tags.join(", "),
      }),
    });

    const result = await response.json();
    if (response.ok) {
      console.log("Question posted successfully:", result);
      setTitle("");
      setDescription("");
      setTags([]);
      setError("");
    } else {
      console.error("Failed to post question:", result.msg);
      setError(result.msg || "Failed to post question.");
    }
  } catch (error) {
    console.error("Error posting question:", error);
    setError("Error posting question.");
  }
};

  return (
    <Layout>
      <section className="question-container">
        <h1 className="title">Steps To Write A Good Question</h1>
        <ul className="steps-list">
          <li>
            <FaArrowRight className="list-icon" />
            Summarize your problem in a one-line title
          </li>
          <li>
            <FaArrowRight className="list-icon" />
            Describe your problem in more detail
          </li>
          <li>
            <FaArrowRight className="list-icon" />
            Explain what you tried and what you expected to happen
          </li>
          <li>
            <FaArrowRight className="list-icon" />
            Review your question and post it here
          </li>
        </ul>
        <div className="post-question-form">
          <h2 className="form-title">Post Your Question Here</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="question-title-input"
              placeholder="Question title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="question-details-textarea"
              placeholder="Question details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <div className="tag-container">
              <input
                type="text"
                className="tag-input"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag"
              />
              <button
                className="add-tag-button"
                type="button"
                onClick={handleAddTag}
              >
                Add Tag
              </button>
              <div className="tags-list">
                {tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <button type="submit" className="submit-button">
              Submit Question
            </button>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
      </section>
    </Layout>
  );
}

export default QuestionPage;
