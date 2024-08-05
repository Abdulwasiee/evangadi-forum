import React, { useState, useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/Auth"; // Adjust the path to your AuthContext file
import "./SignIn.css";

const SignIn = () => {
  const { login } = useContext(AuthContext); // Access login function from context
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:2000/api/user/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        await login(result.token);

        setMessage(result.msg);
        setError("");
        setFormData({ username: "", password: "" });

        navigate("/home");
      } else {
        setError(result.message || "Sign-in failed.");
        setMessage("");
      }
    } catch (error) {
      setError("Error during sign-in. Please try again.");
      setMessage("");
    }
  };

  return (
    <div className="signin-container">
      <h2 className="signin-title">Sign In</h2>
      <form onSubmit={handleSubmit} className="signin-form">
        <div className="form-input">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-input password-input">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        <button type="submit" className="signin-button">
          Sign In
        </button>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
      </form>
      <p className="signup-link">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default SignIn;
