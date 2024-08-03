import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Auth/Auth";
import logo from "../../assets/evangadi-logo-black.png";
import "./Header.css";

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

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
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="logout-button">
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
            </>
          )}
        </ul>
      </section>
    </header>
  );
};

export default Header;
