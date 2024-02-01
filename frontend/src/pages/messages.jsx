import AppSidebar from "../components/sidebar";

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingScreen from "../components/loading-screen";
import { useEffect, useState, useMemo } from "react";
import DateDiv from "../components/date-div";

function Messages() {
  const { isAuthenticated, loading, user } = useSelector((state) => state.user);

  const [changeRequests, setChangeRequests] = useState([]);

  const months = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) =>
        new Date(0, i).toLocaleString("en", { month: "short" })
      ),
    []
  );

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
      const changeRequestsData = await response.json();
      setChangeRequests(changeRequestsData.data);
    };
    getChangeRequests();
  }, [user]);

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
          <h3>Change Requests</h3>
          {changeRequests.map((reqObj, index) => {
            const date = new Date(reqObj.date);
            const day = date.getDate().toString().padStart(2, "0");
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const year = date.getFullYear().toString().substr(-2);
            const dayOfWeek = date.toLocaleString("en-US", {
              weekday: "short",
            });
            return (
              <div>
                <>{reqObj.from_user}</>
                <DateDiv
                  key={`${day}-${index}`}
                  date={{
                    id: `${day}-${month}-${year}`,
                    string_format: `
                    <span class='dow'>${dayOfWeek}</span> | 
                    <span class='date'>${day} - ${
                      months[date.getMonth()]
                    } - ${year}</span>
                  `,
                  }}
                  animationClass={""}
                  handleAnimationEnd={() => {}}
                  shiftsData={[]}
                  user={user}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Messages;
