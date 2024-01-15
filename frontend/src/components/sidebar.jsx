import { useEffect, useState } from "react";
import {
  HiArrowSmLeft,
  HiInbox,
  HiTable,
  HiUserGroup,
  HiViewBoards,
} from "react-icons/hi";

import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { useDispatch } from "react-redux";

import { logout } from "../features/user";

function AppSidebar() {
  const [isManager, setIsManager] = useState(false);
  const dispatch = useDispatch();

  // Get user to check type and display correct menu items.
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    setIsManager(user?.user_type !== "Employee");
  }, []);

  return (
    <div id="sidebar-container">
      <ul className="sidebar">
        <li href="#">
          <HiTable />
          <NavLink to="/dashboard">
            <span className="sidebar-text">Dashboard</span>
          </NavLink>
        </li>
        <li href="#" label="Pro">
          <HiViewBoards />
          <NavLink to="/rota">
            <span className="sidebar-text">My Timetable</span>
          </NavLink>
        </li>
        <li href="#" label="3">
          <HiInbox />
          <NavLink to="/messages">
            <span className="sidebar-text">Messages</span>
          </NavLink>
        </li>
        {isManager && (
          <li href="#">
            <HiUserGroup />
            <NavLink to="/team">
              <span className="sidebar-text">My Team</span>
            </NavLink>
          </li>
        )}
        <li href="#">
          <HiArrowSmLeft />
          <a onClick={() => dispatch(logout())}>
            <span className="sidebar-text">Logout</span>{" "}
            {/* need to navigate to login page/ home page to redirect.*/}
          </a>
        </li>
      </ul>
    </div>
  );
}

export default AppSidebar;
