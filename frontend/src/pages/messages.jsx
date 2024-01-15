import AppSidebar from "../components/sidebar";

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingScreen from "../components/loading-screen";

function Messages() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  if (!user) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
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
