import { useState } from "react";
import "./App.css";
import Register from "./components/Register/Register";
import SignIn from "./components/SignIn/SignIn";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <Register />
      <br />
      <br />
      <br />
      <br />
      <SignIn />
      <br />
      <br />
      <br />
      <Footer/>
    </>
  );
}

export default App;
