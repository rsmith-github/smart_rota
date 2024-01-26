import AppSidebar from "../components/sidebar";

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingScreen from "../components/loading-screen";
import { useEffect, useState } from "react";

function Messages() {
  const { isAuthenticated, loading, user } = useSelector((state) => state.user);

  const { changeRequests, setChangeRequests } = useState([]);

  useEffect(() => {
    const getChangeRequests = async () => {
      const response = await fetch("/api/get-change-requests", {
        method: "PUT",
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify({
          user: user,
        }),
      });
      let changeRequests = await response.json();
      console.log("🚀 ~ getChangeRequests ~ changeRequests:", changeRequests)
    };
    getChangeRequests();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  if (loading) {
    <LoadingScreen />;
  }

  return (
    <div className="page-container">
      <AppSidebar />
      <div className="right-side">
        <span className="page-location-text">Pages / Messages</span>
        <h1 className="page-title">Messages Page</h1>
        <div>
          {/* {changeRequests?.map((reqObj) => {
            <div>{reqObj}</div>;
          })} */}
        </div>
      </div>
    </div>
  );
}

export default Messages;
