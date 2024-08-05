import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import QuestionPage from "./Pages/Question/QuestionPage";
import Landing from "./Pages/Landing/Landing";
import AnswerPage from "./Pages/Answer/Answer";

function Router() {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Landing />} />
      {/* Home page */}
      <Route path="/home" element={<Home />} />
      {/* Question page for posting a new question */}
      <Route path="/home/postQuestion" element={<QuestionPage />} />
      {/* Answer page to view and submit answers */}
      <Route
        path="/home/question/:questionId/answers"
        element={<AnswerPage />}
      />
      {/* Catch-all route for 404 or not found pages */}
      <Route path="*" element={<Landing />} />
    </Routes>
  );
}

export default Router;
