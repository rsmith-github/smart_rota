import { useEffect, useState } from "react";
import {
  HiArrowSmLeft,
  HiInbox,
  HiTable,
  HiUserGroup,
  HiViewBoards,
  HiMenu,
} from "react-icons/hi";

import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { useDispatch } from "react-redux";

import { useLocation } from "react-router-dom";

import { logout } from "../features/user";

function AppSidebar() {
  const [isManager, setIsManager] = useState(false);

  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  function showMobileNav() {
    setIsMobileNavOpen(!isMobileNavOpen);
  }

  const dispatch = useDispatch();

  const location = useLocation().pathname;

  // Get user to check type and display correct menu items.
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    setIsManager(user?.user_type !== "Employee");

    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  return (
    <>
      {matches && (
        <div id="sidebar-container">
          <ul className="sidebar">
            <li className={location === "/dashboard" ? "sbnav-active" : ""}>
              <HiTable />
              <NavLink to="/dashboard">
                <span className="sidebar-text">Dashboard</span>
              </NavLink>
            </li>
            <li className={location === "/rota" ? "sbnav-active" : ""}>
              <HiViewBoards />
              <NavLink to="/rota">
                <span className="sidebar-text">My Timetable</span>
              </NavLink>
            </li>
            <li className={location === "/messages" ? "sbnav-active" : ""}>
              <HiInbox />
              <NavLink to="/messages">
                <span className="sidebar-text">Messages</span>
              </NavLink>
            </li>
            {isManager && (
              <li className={location === "/team" ? "sbnav-active" : ""}>
                <HiUserGroup />
                <NavLink to="/team">
                  <span className="sidebar-text">My Team</span>
                </NavLink>
              </li>
            )}
            <li>
              <HiArrowSmLeft />
              <a onClick={() => dispatch(logout())}>
                <span className="sidebar-text">Logout</span>{" "}
                {/* need to navigate to login page/ home page to redirect.*/}
              </a>
            </li>
          </ul>
        </div>
      )}
      {!matches && (
        <>
          <HiMenu
            className="burger dashboard-burger"
            color="white"
            size={"30px"}
            onClick={showMobileNav}
          />
          <div
            className="mobileNavBarContainer"
            style={{ display: isMobileNavOpen ? "flex" : "none", top: "0px" }}
          >
            <ul className="mobileNavBar">
              <div id="sidebar-container">
                <ul className="sidebar">
                  <li
                    className={location === "/dashboard" ? "sbnav-active" : ""}
                  >
                    <HiTable />
                    <NavLink to="/dashboard">
                      <span className="sidebar-text">Dashboard</span>
                    </NavLink>
                  </li>
                  <li className={location === "/rota" ? "sbnav-active" : ""}>
                    <HiViewBoards />
                    <NavLink to="/rota">
                      <span className="sidebar-text">My Timetable</span>
                    </NavLink>
                  </li>
                  <li
                    className={location === "/messages" ? "sbnav-active" : ""}
                  >
                    <HiInbox />
                    <NavLink to="/messages">
                      <span className="sidebar-text">Messages</span>
                    </NavLink>
                  </li>
                  {isManager && (
                    <li className={location === "/team" ? "sbnav-active" : ""}>
                      <HiUserGroup />
                      <NavLink to="/team">
                        <span className="sidebar-text">My Team</span>
                      </NavLink>
                    </li>
                  )}
                  <li>
                    <HiArrowSmLeft />
                    <a onClick={() => dispatch(logout())}>
                      <span className="sidebar-text">Logout</span>{" "}
                      {/* need to navigate to login page/ home page to redirect.*/}
                    </a>
                  </li>
                </ul>
              </div>
            </ul>
          </div>
        </>
      )}
    </>
  );
}

export default AppSidebar;
