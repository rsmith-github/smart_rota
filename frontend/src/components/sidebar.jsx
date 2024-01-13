import {
  HiArrowSmLeft,
  HiInbox,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";

import { useSelector } from "react-redux";

function AppSidebar() {
  // Get user to check type and display correct menu items.
  const { isAuthenticated, user, username, _loading } = useSelector(
    (state) => state.user
  );

  console.log("🚀 ~ file: sidebar.jsx:14 ~ AppSidebar ~ user:", user);

  return (
    <div id="sidebar-container">
      <ul className="sidebar">
        <li href="#">
          <HiTable />
          Dashboard
        </li>
        <li href="#" label="Pro" labelColor="dark">
          <HiViewBoards />
          My Timetable
        </li>
        <li href="#" label="3">
          <HiInbox />
          Messages
        </li>
        <li href="#">
          <HiUser />
          My Team
        </li>
        <li href="#">
          <HiViewBoards />
          Products
        </li>
        <li href="#">
          <HiArrowSmLeft />
          Logout
        </li>
      </ul>
    </div>
  );
}

export default AppSidebar;
