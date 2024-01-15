import AppSidebar from "../components/sidebar";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import DashboardTop from "../components/dashboard-top";
import DashboardBottom from "../components/dashboard-bottom";
import { getCookie } from "../features/user";

function Dashboard() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  if (!user) {
    return (
      <div className="page-container">
        <AppSidebar />
        <div>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="page-container">
      <AppSidebar />

      <div className="right-side" id="dashboard-container">
        <DashboardTop />
        <DashboardBottom />
      </div>
    </div>
  );
}

export default Dashboard;
