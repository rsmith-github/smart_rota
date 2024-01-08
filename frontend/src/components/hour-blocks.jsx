import convertTo24HourFormat from "../heplers/convert-to-24hr";
import calculateTimeAttributes from "../heplers/calculate-time-attrs";

function HourBlocks({ times }) {
  const hourDivs = [];

  let element_to_add_minutes = null;
  let minutes_to_add = null;
  let flip = '';
  
  for (let i = 1; i <= 19; i++) {

    [element_to_add_minutes, minutes_to_add, flip] = calculateTimeAttributes(i, times, element_to_add_minutes, minutes_to_add, flip);

    let className =
      (i >= times[0]?.hour && i <= times[1]?.hour) ||
      (i >= times[2]?.hour && i <= times[3]?.hour)
        ? "filled hour-block"
        : "hour-block";

    // add to the minutes- class to the next element in the loop
    hourDivs.push(
      <>
        <div className="hour-block-container">
          <div
            key={"cell-" + i}
            id={`hr-${i}`}
            className={
              i === element_to_add_minutes
                ? `${className} minutes-${minutes_to_add}${flip}`
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
