import convertTo24HourFormat from "../heplers/convert-to-24hr";
import calculateTimeAttributes from "../heplers/calculate-time-attrs";

function HourBlocks({ times }) {
  const hourDivs = [];

  for (let i = 1; i <= 19; i++) {
    let [element_to_add_minutes, minutes_to_add, flip] =
      calculateTimeAttributes(i, times);

    // Determine the className based on the hour
    let isFilled =
      (i >= times[0]?.hour && i < times[1]?.hour) ||
      (i >= times[2]?.hour && i < times[3]?.hour);

    let className = isFilled ? "filled hour-block" : "hour-block";

    if (i === element_to_add_minutes) {
      className += ` minutes-${minutes_to_add}${flip}`;
    }

    hourDivs.push(
      <div key={"cell-" + i} className="hour-block-container">
        <div id={`hr-${i}`} className={className}></div>
        <span className="time-text">{convertTo24HourFormat(i + 5)}</span>
      </div>
    );
  }

  return <>{hourDivs}</>;
}

export default HourBlocks;
