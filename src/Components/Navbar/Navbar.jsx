import React from "react";
import { Link, NavLink } from "react-router-dom";

const socialMediaLinks = [
  { platform: "facebook", url: "https://www.facebook.com/mohamed069cbb/" },
  {
    platform: "linkedin",
    url: "https://www.linkedin.com/in/mohamed-mahrous-428557153/",
  },
  { platform: "github", url: "https://github.com/mohamed0690" },
  { platform: "twitter", url: "http://twitter.com/" },
  { platform: "youtube", url: "http://youtube.com" },
];

const generateSocialMediaLinks = () => {
  return socialMediaLinks.map((link) => (
    <Link
      key={link.platform}
      target="_blank"
      to={link.url}
      className="text-decoration-none me-2"
    >
      <i className={`fab fa-${link.platform} mx-1`}></i>
    </Link>
  ));
};

export default function Navbar({ userData, logOut }) {
  const isLoggedIn = userData !== null;
  const loginRegisterLinks = isLoggedIn ? null : (
    <>
      <li className="nav-item product">
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          to="login"
        >
          Login
        </NavLink>
      </li>
      <li className="nav-item product">
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          to="register"
        >
          Register
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <h2 className="noxe  text-white">NOXE</h2>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {userData !== null ? (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  to="movies"
                >
                  Movies
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  to="tvShow"
                >
                  TvShow
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  to="people"
                >
                  People
                </NavLink>
              </li>
            </ul>
          ) : null}

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex align-items-center">
              {generateSocialMediaLinks()}
            </li>
            {loginRegisterLinks}
            {isLoggedIn ? (
              <li className="nav-item product">
                <Link onClick={logOut} className="cursor-pointer nav-link">
                  Logout
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </nav>
  );
}
