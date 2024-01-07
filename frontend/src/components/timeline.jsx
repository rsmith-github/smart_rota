import { useEffect, useState } from "react";

import formatTime from "../heplers/format-time";
import HourBlocks from "./hour-blocks";

function Timeline({ dateId, shift }) {
  let [times, setTimes] = useState([]);

  useEffect(() => {
    if (shift) {
      let morningTimeframe = formatTime(shift["morning_shift"]);
      let eveningTimeframe = formatTime(shift["evening_shift"]);

      setTimes([...times, ...morningTimeframe, ...eveningTimeframe]);
    }
  }, [shift]);

  return (
    <div className="timeline" id={`timeline-${dateId}`}>
      <HourBlocks times={times} />
    </div>
  );
}

export default Timeline;
