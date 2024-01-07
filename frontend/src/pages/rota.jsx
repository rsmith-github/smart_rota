import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { getCookie } from "../features/user";
import { getTeamMemberShiftsData } from "../components/timetable";
import Timeline from "../components/timeline";

import convertId from "../heplers/convertId";

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
  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString("en", { month: "short" })
  );

  const getDates = () => {
    let date = new Date(
      startOfWeek.getFullYear(),
      startOfWeek.getMonth(),
      startOfWeek.getDate()
    );
    let datelist = [];

    while (date <= endOfWeek) {
      let day = date.getDate().toString().padStart(2, "0");
      let month = (date.getMonth() + 1).toString().padStart(2, "0");
      let year = date.getFullYear().toString().substr(-2);
      let dayOfWeek = new Date(date.getTime()).toLocaleString("en-US", {
        weekday: "short",
      });

      let formattedDate = {
        string_format: `
        <span class='dow'>${dayOfWeek}</span> | 
        <span class='date'>${day} - ${months[date.getMonth()]} - ${year}</span>
        `,

        id: `${day}-${month}-${year}`,
      };

      datelist.push(formattedDate);
      date.setDate(date.getDate() + 1);
    }

    return datelist;
  };

  const prevWeek = () => {
    setAnimationClass("fade");
    setTimeout(() => {
      setStartOfWeek(new Date(startOfWeek.setDate(startOfWeek.getDate() - 7)));
      setEndOfWeek(new Date(endOfWeek.setDate(endOfWeek.getDate() - 7)));
      setAnimationClass("slide-in-right");
    }, 500);
  };

  const nextWeek = () => {
    setAnimationClass("fade");
    setTimeout(() => {
      setStartOfWeek(new Date(startOfWeek.setDate(startOfWeek.getDate() + 7)));
      setEndOfWeek(new Date(endOfWeek.setDate(endOfWeek.getDate() + 7)));
      setAnimationClass("slide-in-left");
    }, 500);
  };

  const [shiftsData, setShiftsData] = useState({});

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

  const accessToken = getCookie("access_token");

  useEffect(() => {
    if (accessToken) {
      fetchShiftData();
    }
  }, [startOfWeek, endOfWeek, accessToken]);

  // this is not working yet.
  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="rota">
      <div id="buttons-container">
        <button className="weeks-button" onClick={prevWeek}>
          Previous Week
        </button>
        <button className="weeks-button" onClick={nextWeek}>
          Next Week
        </button>
      </div>
      {getDates().map((date, index) => (
        <div
          id={date.id}
          key={`${startOfWeek}-${index}`}
          className={`date-div ${animationClass}`}
          onAnimationEnd={() => setAnimationClass("")}
        >
          <div dangerouslySetInnerHTML={{ __html: date.string_format }} />
          {shiftsData && (
            <Timeline dateId={date.id} shift={shiftsData[convertId(date.id)]} />
          )}
        </div>
      ))}
    </div>
  );
}

export default Rota;
