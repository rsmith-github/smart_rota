import AppSidebar from "../components/sidebar";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import DashboardTop from "../components/dashboard-top";
import DashboardBottom from "../components/dashboard-bottom";

function Dashboard() {
  const { isAuthenticated } = useSelector((state) => state.user);

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
