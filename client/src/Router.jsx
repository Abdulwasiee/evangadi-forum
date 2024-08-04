import React from "react";
import Home from "./Pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import QuestionPage from "./Pages/Question/QuestionPage";
import Landing from "./Pages/Landing/Landing";

function Router() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="postQuestion" element={<QuestionPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default Router;
