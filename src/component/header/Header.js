import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function Header({ inputValue }) {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [openMenu, setMenu] = useState(false);
  function handleChange(e) {
    inputValue(e.target.value);
  }

  function handleToggle(e) {
    setMenu(!openMenu);
  }

  return (
    <div className="header">
      <div className="header-left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="logo">
            <img
              className="header_icon"
              src="https://play-lh.googleusercontent.com/fQ_PzyjsdPayvqSxXpkk_Hoiz6nBGXA1i_z34vagQIqu8goxbWm6XU8OXWNtErhhD8g=w240-h480-rw"
              alt="MovieFy"
              width="40"
              height="40"
            />
            <p className="logo_txt">
              <span id="h-2">MovieFy</span>
            </p>
          </div>
        </Link>
        <Link to="/search" style={{ textDecoration: "none" }}>
          <div className="search_bar">
            <div className="content">
              <button className="search">
                <i className="fa fa-search" aria-hidden="true"></i>
              </button>
              <div className="input">
                <input
                  type="text"
                  className="input_text"
                  placeholder="search movies.."
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span id="page">Discover</span>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span id="page">Browse</span>
        </Link>
        <Link to="/news" style={{ textDecoration: "none" }}>
          <span id="page">News</span>
        </Link>
      </div>
      <div className="header-right">
        <div className="dropdown">
          <button className="toggler" onClick={handleToggle}>
            <i className="fa fa-bars fa-2x" aria-hidden="true"></i>
          </button>
          {/* menu state */}

          {openMenu ? (
            <ul className="item_block">
              <li className="item">
                <div className="userInfo">
                  {isAuthenticated ? (
                    <div className="username">
                      <div className="user">
                        <span>Welcome,</span>
                        <span>{user.nickname}</span>
                      </div>
                      <button
                        className="auth"
                        onClick={() =>
                          logout({
                            logoutParams: { returnTo: window.location.origin },
                          })
                        }
                      >
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <button
                      className="auth"
                      onClick={() => loginWithRedirect()}
                    >
                      Sign In
                    </button>
                  )}
                </div>
              </li>
              <li className="item">
                <Link to="/" style={{ textDecoration: "none" }}>
                  <span>Discover</span>
                </Link>
              </li>
              <li className="item">
                <Link to="/" style={{ textDecoration: "none" }}>
                  <span>Browse</span>
                </Link>
              </li>
              <li className="item">
                <Link to="/news" style={{ textDecoration: "none" }}>
                  <span>News</span>
                </Link>
              </li>
            </ul>
          ) : (
            <></>
          )}
        </div>
        {/* end menu */}

        <div className="userInfo" id="page">
          {isAuthenticated ? (
            <div className="username">
              <div className="user">
                <span>Welcome,</span>
                <span>{user.nickname}</span>
              </div>
              <button
                className="auth"
                onClick={() =>
                  logout({
                    logoutParams: { returnTo: window.location.origin },
                  })
                }
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button className="auth" onClick={() => loginWithRedirect()}>
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
