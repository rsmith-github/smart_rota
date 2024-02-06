import AppSidebar from "../components/sidebar";

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingScreen from "../components/loading-screen";
import { useEffect, useState, useMemo } from "react";
import DateDiv from "../components/date-div";
import convertId from "../heplers/convertId";

function Messages() {
  const { isAuthenticated, loading, user } = useSelector((state) => state.user);

  const [changeRequests, setChangeRequests] = useState([]);
  const [formattedRequests, setFormattedRequests] = useState([]);

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

      // Initialize an empty object for formatted requests
      let formattedReqs = {};

      // Iterate over each change request and add it to the formattedReqs object
      changeRequestsData.data.forEach((object) => {
        const date = new Date(object.date);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear().toString().substr(-2);
        const id = `${day}-${month}-${year}`;

        // Assign the shift data to the corresponding date ID in the formattedReqs object
        formattedReqs[convertId(id)] = {
          morning_shift: object.morning_shift,
          evening_shift: object.evening_shift,
        };
      });

      // Optionally, add the username if needed
      if (changeRequestsData.data.length > 0) {
        formattedReqs.username = changeRequestsData.data[0].from_user;
      }

      setFormattedRequests(formattedReqs);
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
      <div className="right-side messages-right-side">
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
            const id = `${day}-${month}-${year}`;
            return (
              <div>
                <DateDiv
                  key={`${day}-${index}`}
                  date={{
                    id,
                    string_format: `
                    <span class='dow'>${dayOfWeek}</span> | 
                    <span class='date'>${day} - ${
                      months[date.getMonth()]
                    } - ${year}</span>
                  `,
                  }}
                  animationClass={""}
                  handleAnimationEnd={() => {}}
                  shiftsData={{ ...formattedRequests }}
                  user={user}
                  from_user={reqObj.from_user}
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
