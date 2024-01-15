import React, { useState } from "react";
import dayjs from "dayjs";

import TimeRow from "./timeRow";
import convertId from "../heplers/convertId";

export async function getTeamMemberShiftsData(props) {
  const response = await fetch("/api/get-timetable", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: props.timeTableOwner,
    }),
  });

  return await response.json();
}

const TimeTable = (props) => {
  const onClick = () => {
    props.setFormVisible(!props.formVisible);
  };

  const [timeTable, setTimeTable] = useState([]);

  const handleMorningShiftStartChange = (dayIndex, time) => {
    const formattedTime = dayjs(time).format("HH:mm");
    setTimeTable((prevTable) => {
      const updatedTable = [...prevTable];
      updatedTable[dayIndex].morningShift.start = formattedTime;
      return updatedTable;
    });
  };

  const handleMorningShiftEndChange = (dayIndex, time) => {
    const formattedTime = dayjs(time).format("HH:mm");
    setTimeTable((prevTable) => {
      const updatedTable = [...prevTable];
      updatedTable[dayIndex].morningShift.end = formattedTime;
      return updatedTable;
    });
  };

  const handleEveningShiftStartChange = (dayIndex, time) => {
    const formattedTime = dayjs(time).format("HH:mm");
    setTimeTable((prevTable) => {
      const updatedTable = [...prevTable];
      updatedTable[dayIndex].eveningShift.start = formattedTime;
      return updatedTable;
    });
  };

  const handleEveningShiftEndChange = (dayIndex, time) => {
    const formattedTime = dayjs(time).format("HH:mm");
    setTimeTable((prevTable) => {
      const updatedTable = [...prevTable];
      updatedTable[dayIndex].eveningShift.end = formattedTime;
      return updatedTable;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send the timeTable data to the server
    console.log(timeTable);
    const response = await fetch("/api/update-timetable", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: props.timeTableOwner,
        timeTable: timeTable,
      }),
    });
  };

  const generateNextWeekTimeTable = async () => {
    const startOfWeek = dayjs().startOf("week").add(7, "day"); // Start from next Monday
    const endOfWeek = startOfWeek.add(7, "day"); // End on next Sunday

    // console.log(startOfWeek, endOfWeek);
    const weekRange = [];
    let currentDate = startOfWeek;

    while (currentDate.isBefore(endOfWeek)) {
      weekRange.push(currentDate.format("DD-MM-YY"));
      currentDate = currentDate.add(1, "day");
    }

    let currentUsersShifts = await getTeamMemberShiftsData(props);

    const initialTable = weekRange.map((date) => {

      // format e.g. 09-01-24 to 9-1-24
      const formattedKey = convertId(date);

      if (currentUsersShifts[formattedKey]) {

        let shift = currentUsersShifts[formattedKey];

        return {
          date,
          morningShift: {
            start: shift.morning_shift.split("-")[0],
            end: shift.morning_shift.split("-")[1],
          },
          eveningShift: {
            start: shift.evening_shift.split("-")[0],
            end: shift.evening_shift.split("-")[1],
          },
        };
      }

      return {
        date,
        morningShift: { start: "99:99", end: "99:99" }, // default times are invalid times.
        eveningShift: { start: "99:99", end: "99:99" },
      };
    });

    setTimeTable(initialTable);
  };

  // Generate the initial time table for the next week
  useState(() => {
    generateNextWeekTimeTable();
  }, []);

  return (
    <div className="timetable-container">
      <div className="timetable">
        <div className="timetable-header">
          <div></div>
          <h4>{props.timeTableOwner}'s Timetable</h4>
          <button onClick={onClick}>X</button>
        </div>

        <form onSubmit={handleSubmit} action="">
          {timeTable.map((day, index) => (
            <>
              <TimeRow
                day={day}
                index={index}
                handleEveningShiftStartChange={handleEveningShiftStartChange}
                handleEveningShiftEndChange={handleEveningShiftEndChange}
                handleMorningShiftStartChange={handleMorningShiftStartChange}
                handleMorningShiftEndChange={handleMorningShiftEndChange}
              />
              {index !== timeTable.length - 1 ? (
                <span className="br-as-line"></span>
              ) : (
                <br />
              )}
            </>
          ))}
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default TimeTable;
