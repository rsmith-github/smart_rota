import React, { useState, useEffect, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import user, { getCookie } from "../features/user";
import { getTeamMemberShiftsData } from "../components/timetable";
import Timeline from "../components/timeline";
import AppSidebar from "../components/sidebar";
import convertId from "../heplers/convertId";

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
  const [animationClass, setAnimationClass] = useState("slide-up");
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

  const { user } = useSelector((state) => state.user);

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

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="rota">
      <AppSidebar />
      <div className="rota-right-side">
        <div id="buttons-container">
          <button
            className="weeks-button"
            onClick={() => {
              changeWeek("prev");
            }}
          >
            Previous Week
          </button>
          <button
            className="weeks-button"
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
            />
          ))}
        </div>
      </div>
    </div>
  );
}
function DateDiv({ date, animationClass, handleAnimationEnd, shiftsData }) {
  const shiftData = shiftsData[convertId(date.id)];

  return (
    <div
      id={date.id}
      className={`date-div ${animationClass}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <div dangerouslySetInnerHTML={{ __html: date.string_format }} />
      {shiftData ? (
        // Shift data display logic
        <>
          <span className="shift-text">
            <span className="shift-title">🌞 : </span>
            {shiftsData[convertId(date.id)]?.morning_shift}
          </span>
          <br />
          <span className="shift-text">
            <span className="shift-title">🌙 : </span>
            {shiftsData[convertId(date.id)]?.evening_shift}
          </span>
        </>
      ) : (
        // Display for day off
        <>
          <span className="shift-title day-off"> day off</span>
          <span className="emoji">😴</span>
          {/* {shiftsData && (
            <Timeline dateId={date.id} shift={shiftsData[convertId(date.id)]} />
          )} */}
        </>
      )}
      {shiftData && <Timeline dateId={date.id} shift={shiftData} />}
    </div>
  );
}

export default Rota;
