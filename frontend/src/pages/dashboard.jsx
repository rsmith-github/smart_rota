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
      <h1>Dashboard</h1>
    </div>
  );
}

export default Dashboard;
