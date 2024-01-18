import React, { useState, useEffect, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCookie } from "../features/user";
import { getTeamMemberShiftsData } from "../components/timetable";

import AppSidebar from "../components/sidebar";
import DateDiv from "../components/date-div";

import { getDates } from "../heplers/rota-helpers";

function Rota() {
  const today = new Date();
  const [startOfWeek, setStartOfWeek] = useState(
    new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - today.getDay()
    )
  );
  const [endOfWeek, setEndOfWeek] = useState(
    new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - today.getDay() + 6
    )
  );
  const [animationClass, setAnimationClass] = useState("");
  const [shiftsData, setShiftsData] = useState({});
  const accessToken = getCookie("access_token");

  const months = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) =>
        new Date(0, i).toLocaleString("en", { month: "short" })
      ),
    []
  );

  const changeWeek = (direction) => {
    setAnimationClass("fade");
    setTimeout(() => {
      const change = direction === "next" ? 7 : -7;
      setStartOfWeek(
        new Date(startOfWeek.setDate(startOfWeek.getDate() + change))
      );
      setEndOfWeek(new Date(endOfWeek.setDate(endOfWeek.getDate() + change)));
      setAnimationClass(
        direction === "next" ? "slide-in-left" : "slide-in-right"
      );
    }, 500);
  };

  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (accessToken) {
      fetchShiftData();
    }
  }, [startOfWeek, endOfWeek, accessToken, user]);

  const fetchShiftData = async () => {
    const userPromise = await fetch("/me", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getCookie("access_token")}`,
      },
    });
    const userData = await userPromise.json();

    const fetchedShiftsData = await getTeamMemberShiftsData({
      timeTableOwner: userData.username,
    });

    setShiftsData(fetchedShiftsData);
  };

  const handleAnimationEnd = () => setAnimationClass("");

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="rota page-container">
      <AppSidebar />
      <div className="rota-right-side">
        <div id="buttons-container">
          <button
            className="primary-button"
            onClick={() => {
              changeWeek("prev");
            }}
          >
            Previous Week
          </button>
          <button
            className="primary-button"
            onClick={() => {
              changeWeek("next");
            }}
          >
            Next Week
          </button>
        </div>
        <div id="date-divs-container">
          {getDates(startOfWeek, endOfWeek, months).map((date, index) => (
            <DateDiv
              key={`${startOfWeek}-${index}`}
              date={date}
              animationClass={animationClass}
              handleAnimationEnd={handleAnimationEnd}
              shiftsData={shiftsData}
              user={user}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Rota;
