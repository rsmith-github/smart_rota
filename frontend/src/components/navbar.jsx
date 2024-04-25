import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { pointer } from "d3";
import { logout } from "../features/user";
import { HiChevronDown } from "react-icons/hi";
import { HiMenu } from "react-icons/hi";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();

  const { isAuthenticated, user, username } = useSelector(
    (state) => state.user
  );

  // Add this useEffect hook
  useEffect(() => {
    const navbar = document.querySelector(".navContainer");
    const sticky = navbar.offsetTop;

    const stickyNav = () => {
      if (window.pageYOffset > sticky) {
        navbar.classList.add("sticky");
      } else {
        navbar.classList.remove("sticky");
      }
    };

    window.addEventListener("scroll", stickyNav);
    return () => {
      window.removeEventListener("scroll", stickyNav);
    };
  }, []);

  function showMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  // const logout = (event) => {
  //   event.preventDefault();
  //   localStorage.setItem("access_token", "");
  //   localStorage.setItem("refresh_token", "");

  //   // navigate("/login", { replace: true });
  // };

  const authLinks = (
    <>
      <li>
        <a href="/" style={{ fontSize: "larger" }}>
          <strong>{username}</strong>
        </a>
      </li>
      <li>
        <NavLink className="spa-link" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className="spa-link" to="/dashboard">
          Dashboard
        </NavLink>
      </li>
      <li>
        <a style={{ cursor: pointer }} onClick={() => dispatch(logout())}>
          Logout
        </a>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li>
        <p
          id="register-dropdown"
          className="nav-link dropdown-toggle"
          onMouseEnter={showMenu}
          onMouseLeave={showMenu}
          style={
            !isMenuOpen
              ? { paddingBottom: "10px", paddingTop: "10px" }
              : { paddingTop: "10px" }
          }
        >
          Register <HiChevronDown />
          {isMenuOpen && (
            <div style={{ paddingTop: "10px" }}>
              <div className="dropdown-menu">
                <NavLink className="dropdown-item" to="/register-employer">
                  Manager Profile
                </NavLink>
                <NavLink className="dropdown-item" to="/register-employee">
                  Team Member Profile
                </NavLink>
                <div className="dropdown-divider"></div>
                <NavLink className="dropdown-item" to="/register-company">
                  Register Company
                </NavLink>
              </div>
            </div>
          )}
        </p>
      </li>
      <li style={{ marginTop: "10px" }}>
        <NavLink to="/login">Login</NavLink>
      </li>
    </>
  );

  return (
    <nav>
      <div className="navContainer">
        <div className="logoContainer">
          <a href="/">
            <h2 id="logo">SMART ROTA</h2>
          </a>
          <h2 id="logo">SMART ROTA</h2>
        </div>
        <div>
          <ul className="navBar">{isAuthenticated ? authLinks : guestLinks}</ul>
          <HiMenu className="burger" color="white" size={"30px"} />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
