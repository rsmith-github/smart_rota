import React, { useState, useEffect, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCookie } from "../features/user";
import { getTeamMemberShiftsData } from "../components/timetable";
import { CustomTimePicker } from "../components/timeRow";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

import TimeRow from "../components/timeRow";

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

function DateDiv({
  date,
  animationClass,
  handleAnimationEnd,
  shiftsData,
  user,
}) {
  const shiftData = shiftsData[convertId(date.id)];

  const currentShiftData = {
    date: date.id,
    morningShift: {
      start: shiftData?.morning_shift.split("-")[0],
      end: shiftData?.morning_shift.split("-")[1],
    },
    eveningShift: {
      start: shiftData?.evening_shift.split("-")[0],
      end: shiftData?.evening_shift.split("-")[1],
    },
  };

  const changeShift = (element) => {
    document.getElementById(`hidden-${element}`).style.display = "block";
  };

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
            {shiftData?.morning_shift}
          </span>
          <br />
          {user.user_type === "Employee" ? (
            <>
              <div className="request-change-container">
                <span className="shift-text">
                  <span className="shift-title">🌙 : </span>
                  {shiftData?.evening_shift}
                </span>
                <div>
                  <span>Something wrong?</span>
                  <button
                    className="primary-button"
                    id="request-change-button"
                    onClick={() => {
                      changeShift(date.id);
                    }}
                  >
                    Request Change
                  </button>
                </div>
              </div>
              <form action="">
                <div
                  className="hidden rota-timepicker"
                  id={`hidden-${date.id}`}
                >
                  <TimeRow
                    day={currentShiftData}
                    // index={index}
                    // handleEveningShiftStartChange={handleEveningShiftStartChange}
                    // handleEveningShiftEndChange={handleEveningShiftEndChange}
                    // handleMorningShiftStartChange={handleMorningShiftStartChange}
                    // handleMorningShiftEndChange={handleMorningShiftEndChange}
                  />
                </div>
              </form>
            </>
          ) : (
            <span className="shift-text">
              <span className="shift-title">🌙 : </span>
              {shiftData?.evening_shift}
            </span>
          )}
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
