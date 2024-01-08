import convertTo24HourFormat from "../heplers/convert-to-24hr";

function HourBlocks({ times }) {
  const hourDivs = [];

  let element_to_add_minutes = 999999999; // defualt is invalid
  let minutes_to_add = 999999999;

  for (let i = 1; i <= 19; i++) {
    let className =
      (i >= times[0]?.hour && i <= times[1]?.hour) ||
      (i >= times[2]?.hour && i <= times[3]?.hour)
        ? "filled hour-block"
        : "hour-block";

    if (i === times[1]?.hour) {
      element_to_add_minutes = i + 1;
      minutes_to_add = times[1]?.min;
    }

    // add to the minutes- class to the next element in the loop
    hourDivs.push(
      <>
        <div className="hour-block-container">
          <div
            key={"cell-" + i}
            id={`hr-${i}`}
            className={
              i == element_to_add_minutes
                ? `${className} minutes-${minutes_to_add}`
                : `${className}`
            }
          ></div>
          <span className="time-text">{convertTo24HourFormat(i + 5)}</span>
        </div>
      </>
    );
  }

  return <>{hourDivs}</>;
}

export default HourBlocks;
