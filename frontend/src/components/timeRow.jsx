import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";

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

    const date = props.day.date.split('-');
    const formattedDate = `${date[1]}-${date[0]}-${date[2].at(-2)}${date[2].at(-1)}`
    return (
        <div className="timepicker-container" key={props.day.date}>
        <p className="day-of-the-week">{formattedDate} &nbsp; {daysOfWeek[props.index]}:</p>
        <div className="start-end-container">
          <div className="start-end-container-first-child">
            <div className="start-end-item">
              <label>Morning Shift Start Time:</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  value={props.day.morningShift.start}
                  onChange={(time) =>
                    props.handleMorningShiftStartChange(props.index, time)
                  }
                />
              </LocalizationProvider>
            </div>
            <div className="start-end-item">
              <label>Morning Shift End Time:</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  value={props.day.morningShift.end}
                  onChange={(time) =>
                    props.handleMorningShiftEndChange(props.index, time)
                  }
                />
              </LocalizationProvider>
            </div>
          </div>
          <div  className="start-end-container-first-child">
            <div className="start-end-item">
              <label>Evening Shift Start Time:</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  value={props.day.eveningShift.start}
                  onChange={(time) =>
                    props.handleEveningShiftStartChange(props.index, time)
                  }
                />
              </LocalizationProvider>
            </div>
            <div className="start-end-item">
              <label>Evening Shift End Time:</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  value={props.day.eveningShift.end}
                  onChange={(time) =>
                    props.handleEveningShiftEndChange(props.index, time)
                  }
                />
              </LocalizationProvider>
            </div>
          </div>
        </div>
      </div>
    )
}

export default TimeRow;