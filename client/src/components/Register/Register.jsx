import React, { useState } from "react";
import axios from "axios";
import "./register.css"; 

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    firstname: "",
    lastname: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:2000/api/user/register",
        formData
      );
      setMessage(response.data.msg);
      setError(""); // Clear any previous errors
      setFormData({
        email: "",
        username: "",
        password: "",
        firstname: "",
        lastname: "",
      });
    } catch (error) {
      // Check if the error response exists
      if (error.response) {

        setError(error.response.data.msg || "Please try again.");
      } else {
       
        setError("An unexpected error occurred.");
      }
      setMessage(""); 
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Join the network</h2>
      <p>
        Already have an account? <a href="/signin">Sign In</a>
      </p>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-input">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="fullName">
          <div className="form-input">
            <input
              type="text"
              id="firstname"
              name="firstname"
              placeholder="Enter your first name"
              value={formData.firstname}
              onChange={handleChange}
            />
          </div>
          <div className="form-input">
            <input
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Enter your last name"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-input">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-input">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="register-button">
          Register
        </button>
        <br />
        <br />
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
      </form>
      <p className="terms-privacy-links">
        I agree with <a href="/privacy">privacy policies</a> and{" "}
        <a href="/terms">terms of service</a>
      </p>
      <p>
        <a href="/signin">Already have an account?</a>
      </p>
    </div>
  );
};

export default Register;
