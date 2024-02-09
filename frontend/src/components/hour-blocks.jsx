import convertTo24HourFormat from "../heplers/convert-to-24hr";
import calculateTimeAttributes from "../heplers/calculate-time-attrs";

function HourBlocks({
  times,
  morningShiftChanged = false,
  eveningShiftChanged = false,
}) {
  const hourDivs = [];

  for (let i = 1; i <= 19; i++) {
    let [element_to_add_minutes, minutes_to_add, flip] =
      calculateTimeAttributes(i, times);

    // Determine the className based on the hour
    let isFilled =
      (i >= times[0]?.hour && i < times[1]?.hour) ||
      (i >= times[2]?.hour && i < times[3]?.hour) ||
      (i >= times[2]?.hour && i <= times[3]?.hour && morningShiftChanged) ||
      (i >= times[2]?.hour && i <= times[3]?.hour && eveningShiftChanged);

    let className = isFilled ? "filled hour-block" : "hour-block";

    const isElementToAddMinutesTo = i === element_to_add_minutes;

    if (isElementToAddMinutesTo) {
      className += ` minutes-${minutes_to_add}${flip}`;
    }

    if (
      (i <= 10 && isFilled && morningShiftChanged) ||
      (i >= 9 && isFilled && eveningShiftChanged)
    ) {
      className += " yellow";
    }

    if (isElementToAddMinutesTo && i <= 10 && isFilled && morningShiftChanged) {
      className = className.replace(
        "yellow",
        `shift-start-${minutes_to_add}-yellow`
      );
    } else if (
      (isElementToAddMinutesTo && i >= 10 && isFilled && eveningShiftChanged) ||
      (isElementToAddMinutesTo && i <= 10 && morningShiftChanged)
    ) {
      className = className.includes('yellow') ? className.replace("yellow",`minutes-${minutes_to_add}-yellow`) : className + ` minutes-${minutes_to_add}-yellow`;
      
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
