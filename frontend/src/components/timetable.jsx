import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const TimeTable = (props) => {
  const onClick = () => {
    props.setFormVisible(!props.formVisible);
  };

  const [timeTable, setTimeTable] = useState([]);

  const handleStartTimeChange = (dayIndex, time) => {
    setTimeTable((prevTable) => {
      const updatedTable = [...prevTable];
      updatedTable[dayIndex].start = time;
      return updatedTable;
    });
  };

  const handleEndTimeChange = (dayIndex, time) => {
    setTimeTable((prevTable) => {
      const updatedTable = [...prevTable];
      updatedTable[dayIndex].end = time;
      return updatedTable;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the timeTable data to the server
    console.log(timeTable);
    // ... Rest of the logic
  };

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const generateNextWeekTimeTable = () => {
    const startOfWeek = dayjs().startOf("week").add(1, "day"); // Start from next Monday
    const endOfWeek = startOfWeek.add(6, "day"); // End on next Sunday

    const weekRange = [];
    let currentDate = startOfWeek;

    while (currentDate.isBefore(endOfWeek)) {
      weekRange.push(currentDate.format("YYYY-MM-DD"));
      currentDate = currentDate.add(1, "day");
    }

    const initialTable = weekRange.map((date) => ({
      date,
      start: "08:00",
      end: "17:00",
    }));

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

        <form onSubmit={handleSubmit}>
          {timeTable.map((day, index) => (
            <>
              <div className="timepicker-container" key={day.date}>
                <p className="day-of-the-week">{daysOfWeek[index]}:</p>
                <div className="start-end-container">
                  <div>
                    <label>Start Time:</label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        value={day.start}
                        onChange={(time) => handleStartTimeChange(index, time)}
                      />
                    </LocalizationProvider>
                  </div>
                  <div>
                    <label>End Time:</label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        value={day.end}
                        onChange={(time) => handleEndTimeChange(index, time)}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
              </div>
              {index !== timeTable.length-1 ? (
                  <span class="br-as-line"></span>
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
