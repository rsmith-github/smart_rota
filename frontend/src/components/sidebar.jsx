import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";

function AppSidebar() {
  return (
    <div id="sidebar-container">
      <ul className="sidebar">
        <li href="#">
          <HiTable />
          Dashboard
        </li>
        <li href="#" label="Pro" labelColor="dark">
          <HiChartPie />
          Kanban
        </li>
        <li href="#" label="3">
          <HiInbox />
          Inbox
        </li>
        <li href="#">
          <HiUser />
          Users
        </li>
        <li href="#">
          <HiViewBoards />
          Products
        </li>
        <li href="#">
          <HiArrowSmRight />
          Sign In
        </li>
        <li href="#">
          <HiUser />
          Sign Up
        </li>
      </ul>
    </div>
  );
}

export default AppSidebar;
