import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import QuestionPage from "./Pages/Question/QuestionPage";
import Landing from "./Pages/Landing/Landing";
import AnswerPage from "./Pages/Answer/Answer";
import Protect from "./components/Protection/Protect";

function Router() {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <Protect>
            {" "}
            <Home />
          </Protect>
        }
      />
      <Route
        path="/home/postQuestion"
        element={
          <Protect>
            {" "}
            <QuestionPage />
          </Protect>
        }
      />

      <Route
        path="/home/question/:questionId/answers"
        element={
          <Protect>
            {" "}
            <AnswerPage />
          </Protect>
        }
      />
      <Route path="*" element={<Landing />} />
    </Routes>
  );
}

export default Router;
