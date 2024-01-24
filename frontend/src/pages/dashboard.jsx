import AppSidebar from "../components/sidebar";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import DashboardTop from "../components/dashboard-top";
import DashboardBottom from "../components/dashboard-bottom";

import LoadingScreen from "../components/loading-screen";

function Dashboard() {
  const { isAuthenticated, loading } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  if (loading) {
    return <LoadingScreen />;
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
