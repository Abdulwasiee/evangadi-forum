import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import QuestionPage from "./Pages/Question/QuestionPage";
import Landing from "./Pages/Landing/Landing";
import AnswerPage from "./Pages/Answer/Answer";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/home/postQuestion" element={<QuestionPage />} />
      <Route
        path="/home/question/:questionId/answers"
        element={<AnswerPage />}
      />
      <Route path="*" element={<Landing />} />
    </Routes>
  );
}

export default Router;
