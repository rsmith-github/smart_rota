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
      <div className="right-side">
        <span className="page-location-text">Pages / Messages</span>
          <h1 className="page-title">Messages Page</h1>
      </div>
    </div>
  );
}

export default Messages;
