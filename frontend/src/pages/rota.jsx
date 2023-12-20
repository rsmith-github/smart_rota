import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import * as d3 from "d3";
import { timelines } from "d3-timelines";
import { getCookie } from "../features/user";
import { getTeamMemberShiftsData } from "../components/timetable";

import { getUser } from "../features/user";

function showTimeline() {
  (async () => {
    const userPromise = await fetch("/me", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getCookie("access_token")}`,
      },
    });
    const userData = await userPromise.json();

    let shiftsData = await getTeamMemberShiftsData({
      timeTableOwner: userData.username,
    });
    console.log("🚀 ~ file: rota.jsx:25 ~ shiftsData:", shiftsData);
  })();

  let start = new Date();
  start.setHours(6, 0, 0, 0); // Set start time to 6am

  let end = new Date();
  end.setHours(24, 0, 0, 0); // Set end time to 12am

  let data = [
    {
      label: "Rota",
      times: [
        {
          starting_time: start.getTime(),
          ending_time: end.getTime(),
        },
        {
          starting_time: start.getTime() + 4 * 60 * 60 * 1000,
          ending_time: start.getTime() + 5 * 60 * 60 * 1000,
          color: "lightgreen",
        },
        {
          starting_time: start.getTime() + 11 * 60 * 60 * 1000,
          ending_time: start.getTime() + 12 * 60 * 60 * 1000,
          color: "coral",
        },
      ],
    },
  ];

  let chart = timelines().labelFormat(() => undefined);
  // .hover(console.log);

  let svg = d3
    .selectAll(".date-div")
    .append("svg")
    .attr("width", "100%")
    .datum(data)
    .call(chart);

  svg.selectAll("text").style("fill", "black");
}

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
      let formattedDate =
        new Date(date.getTime()).toLocaleString("en-US", { weekday: "short" }) +
        "<br/>" +
        day +
        " - " +
        months[date.getMonth()] +
        " - " +
        date.getFullYear();
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

  const accessToken = getCookie("access_token");

  useEffect(() => {
    if (accessToken && document.querySelector(".date-div")) {
      showTimeline();
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
          key={`${startOfWeek}-${index}`}
          className={`date-div ${animationClass}`}
          onAnimationEnd={() => setAnimationClass("")}
          dangerouslySetInnerHTML={{ __html: date }}
        />
      ))}
    </div>
  );
}

export default Rota;
