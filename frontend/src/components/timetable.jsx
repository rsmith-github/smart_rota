import React from "react";

const TimeTable = (props) => {
  const onClick = () => {
    props.setFormVisible(!props.formVisible);
  };

  return (
    <div class="timetable">
       {props.timeTableOwner}'s Timetable
      <button onClick={onClick}>Close</button>
    </div>
  );
};

export default TimeTable;
