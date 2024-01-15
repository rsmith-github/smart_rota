import AppSidebar from "../components/sidebar";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Dashboard() {
  const { isAuthenticated } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="page-container">
      <AppSidebar />

      <div className="right-side">
        <span className="page-location-text">Pages / Dashboard</span>
        <h1 className="page-title">Main Dashboard</h1>
      </div>
    </div>
  );
}

export default Dashboard;
