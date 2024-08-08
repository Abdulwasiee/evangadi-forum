import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Auth/Auth"; // Adjust the path to your AuthContext file
import logo from "../../assets/evangadi-logo-black.png";
import "./Header.css";

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  useEffect(() => {}, [isAuthenticated]);

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
            <Link to="/">How it Works</Link>
          </li>
          {isAuthenticated ? (
            <li>
              <button className="logout-button" onClick={logout}>
                Log Out
              </button>
            </li>
          ) : (
            <li>
              <Link to="/signIn">Sign In</Link>
            </li>
          )}
        </ul>
      </section>
    </header>
  );
};

export default Header;
