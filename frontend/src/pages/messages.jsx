import React, { useEffect, useState, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingScreen from "../components/loading-screen";
import DateDiv from "../components/date-div";
import AppSidebar from "../components/sidebar";
import convertId from "../heplers/convertId";
import formatDate from "../heplers/format-date";

function Messages() {
  const { isAuthenticated, loading, user } = useSelector((state) => state.user);
  const [requests, setRequests] = useState([]);

  const months = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) =>
        new Date(0, i).toLocaleString("en", { month: "short" })
      ),
    []
  );

  useEffect(() => {
    const fetchChangeRequests = async () => {
      const response = await fetch("/api/get-change-requests", {
        method: "PUT",
        headers: { Accept: "application/json" },
        body: JSON.stringify({ user }),
      });
      const data = await response.json();

      const formattedRequests = data.data.map((req) => {
        const { id, day, month, year, dayOfWeek } = formatDate(req.date);
        return {
          ...req,
          id,
          string_format: `<span class='dow'>${dayOfWeek}</span> | <span class='date'>${day} - ${
            months[new Date(req.date).getMonth()]
          } - ${year}</span>`,
          shiftsData: {
            [convertId(id)]: {
              morning_shift: req.morning_shift,
              evening_shift: req.evening_shift,
            },
          },
        };
      });

      setRequests(formattedRequests);
    };

    if (user) fetchChangeRequests();
  }, [user, months]);

  if (!isAuthenticated) return <Navigate to="/login" />;

  if (loading) return <LoadingScreen />;

  return (
    <div className="page-container">
      <AppSidebar />
      <div className="right-side messages-right-side">
        <span className="page-location-text">Pages / Messages</span>
        <h1 className="page-title">Messages Page</h1>
        <h3>Change Requests</h3>
        <div>
          {requests.map((req, index) => (
            <DateDiv
              key={`${req.id}-${index}`}
              date={{ id: req.id, string_format: req.string_format }}
              animationClass=""
              handleAnimationEnd={() => {}}
              shiftsData={req.shiftsData}
              user={user}
              from_user={req.from_user}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Messages;
