import AppSidebar from "../components/sidebar";

import { Navigate } from "react-router-dom";
import { getCookie } from "../features/user";

function Messages() {
  const accessToken = getCookie("access_token");

  if (!accessToken) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="page-container">
      <AppSidebar />
      <h1>Messages Page</h1>
    </div>
  );
}

export default Messages;
