import { useEffect } from "react";
function Timeline({ dateId, shifts }) {
  console.log("🚀 ~ file: timeline.jsx:2 ~ Timeline ~ shifts:", shifts);
  console.log("🚀 ~ file: timeline.jsx:2 ~ Timeline ~ dateId:", dateId);

  useEffect(() => {
    // Use 'shifts' to create the data needed for the timeline
  }, [shifts]);

  return <div className="timeline" id={`timeline-${dateId}`}></div>;
}

export default Timeline;
