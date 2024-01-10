import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const convertToDayjs = (input) => {
  // Assuming the date is in DD-MM-YY format, split and rearrange it
  const [day, month, year] = input.date.split("-");
  const formattedDate = `20${year}-${month}-${day}`;

  // Convert times
  const morningShiftStart = dayjs(
    `${formattedDate}T${input.morningShift.start}`
  );
  const morningShiftEnd = dayjs(`${formattedDate}T${input.morningShift.end}`);
  const eveningShiftStart = dayjs(
    `${formattedDate}T${input.eveningShift.start}`
  );
  const eveningShiftEnd = dayjs(`${formattedDate}T${input.eveningShift.end}`);

  return {
    morningShift: { start: morningShiftStart, end: morningShiftEnd },
    eveningShift: { start: eveningShiftStart, end: eveningShiftEnd },
  };
};

const CustomTimePicker = ({
  day,
  shiftType,
  shiftTime,
  handleChange,
  index,
}) => {
  const time = day[shiftType][shiftTime];
  const isTimeSet = time !== "99:99";
  const timeValue = isTimeSet
    ? convertToDayjs(day)[shiftType][shiftTime]
    : null;

  return (
    <div className={isTimeSet ? "timeset" : "timenotset"}>
      <TimePicker
        value={timeValue}
        onChange={(time) => handleChange(index, time)}
        minutesStep={15}
      />
    </div>
  );
};

const TimeRow = (props) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const date = props.day.date.split("-");
  const formattedDate = `${date[1]}-${date[0]}-${date[2].at(-2)}${date[2].at(
    -1
  )}`;

  return (
    <div className="timepicker-container" key={props.day.date}>
      <p className="day-of-the-week">
        {formattedDate} &nbsp; {daysOfWeek[props.index]}:
      </p>
      <div className="start-end-container">
        <div className="start-end-container-first-child">
          <div className="start-end-item">
            <label>Morning Shift Start Time:</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <CustomTimePicker
                day={props.day}
                shiftType="morningShift"
                shiftTime="start"
                handleChange={props.handleMorningShiftStartChange}
                index={props.index}
              />
            </LocalizationProvider>
          </div>
          <div className="start-end-item">
            <label>Morning Shift End Time:</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <CustomTimePicker
                day={props.day}
                shiftType="morningShift"
                shiftTime="end"
                handleChange={props.handleMorningShiftEndChange}
                index={props.index}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className="start-end-container-first-child">
          <div className="start-end-item">
            <label>Evening Shift Start Time:</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <CustomTimePicker
                day={props.day}
                shiftType="eveningShift"
                shiftTime="start"
                handleChange={props.handleEveningShiftStartChange}
                index={props.index}
              />
            </LocalizationProvider>
          </div>
          <div className="start-end-item">
            <label>Evening Shift End Time:</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <CustomTimePicker
                day={props.day}
                shiftType="eveningShift"
                shiftTime="end"
                handleChange={props.handleEveningShiftEndChange}
                index={props.index}
              />
            </LocalizationProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeRow;
