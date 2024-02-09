import React, { useState } from "react";
import dayjs from "dayjs";

import TimeRow from "./timeRow";
import TimeTableSkeleton from "./timetable-skeleton";

import convertId from "../heplers/convertId";

import handleShiftChange from "../heplers/handle-rota-change";

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
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send the timeTable data to the server
    await fetch("/api/update-timetable", {
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
    setIsLoading(false);
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
          <button
            onClick={(e) => {
              handleSubmit(e);
              onClick();
            }}
          >
            X
          </button>
        </div>

        <form onSubmit={handleSubmit} action="">
          {isLoading ? (
            <div style={{ height: "85vh" }}>
              <TimeTableSkeleton />
            </div>
          ) : (
            timeTable.map((day, index) => (
              <>
                <TimeRow
                  day={day}
                  index={index}
                  handleEveningShiftStartChange={(index, newTime) => {
                    handleShiftChange(
                      "eveningShift",
                      "start",
                      newTime,
                      setTimeTable,
                      true, // Is list flag, because the handleShfitChange funciton handles both js objects and lists
                      index
                    );
                  }}
                  handleEveningShiftEndChange={(index, newTime) => {
                    handleShiftChange(
                      "eveningShift",
                      "end",
                      newTime,
                      setTimeTable,
                      true, // Is list flag, because the handleShfitChange funciton handles both js objects and lists
                      index
                    );
                  }}
                  handleMorningShiftStartChange={(index, newTime) => {
                    handleShiftChange(
                      "morningShift",
                      "start",
                      newTime,
                      setTimeTable,
                      true, // Is list flag, because the handleShfitChange funciton handles both js objects and lists
                      index
                    );
                  }}
                  handleMorningShiftEndChange={(index, newTime) => {
                    handleShiftChange(
                      "morningShift",
                      "end",
                      newTime,
                      setTimeTable,
                      true,
                      index
                    );
                  }}
                />
                {index !== timeTable.length - 1 ? (
                  <span className="br-as-line"></span>
                ) : (
                  <br />
                )}
              </>
            ))
          )}
          <div className="red-green-container">
            <button type="submit" className="primary-button green">
              Save Changes
            </button>
            <button
              type="submit"
              className="primary-button red"
              onClick={(e) => {
                handleSubmit(e);
                onClick();
              }}
            >
              Save And Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TimeTable;
