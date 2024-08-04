import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/evangadi-logo-black.png";
import "./Header.css";

const Header = () => {
  return (
    <header className="header-container">
      <section className="nav-container">
        <ul className="list-container">
          <li className="logo">
            <img src={logo} alt="Logo" />
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/how-it-works">How it Works</Link>
          </li>

          <li>
            <button>Log Out</button>
          </li>

          <li>
            <Link to="/signIn">Sign In</Link>
          </li>
        </ul>
      </section>
    </header>
  );
};

export default Header;
