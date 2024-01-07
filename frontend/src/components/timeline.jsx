import { useEffect } from "react";
function Timeline({ dateId, shift }) {
  useEffect(() => {
    console.log(
      "🚀 ~ file: timeline.jsx:7 ~ useEffect ~ shift:",
      dateId,
      shift
    );
  }, [shift]);

  

  return <div className="timeline" id={`timeline-${dateId}`}>
    <div id="hr-1" className="hour-block"></div>
    <div id="hr-2" className="hour-block"></div>
    <div id="hr-3" className="hour-block"></div>
    <div id="hr-4" className="hour-block"></div>
    <div id="hr-5" className="hour-block"></div>
    <div id="hr-6" className="hour-block"></div>
    <div id="hr-7" className="hour-block"></div>
    <div id="hr-8" className="hour-block"></div>
    <div id="hr-9" className="hour-block"></div>
    <div id="hr-10" className="hour-block"></div>
    <div id="hr-11" className="hour-block"></div>
    <div id="hr-12" className="hour-block"></div>
    <div id="hr-13" className="hour-block"></div>
    <div id="hr-14" className="hour-block"></div>
    <div id="hr-15" className="hour-block"></div>
    <div id="hr-16" className="hour-block"></div>
    <div id="hr-17" className="hour-block"></div>
    <div id="hr-18" className="hour-block"></div>
    <div id="hr-19" className="hour-block"></div>
    <div id="hr-20" className="hour-block"></div>
    <div id="hr-21" className="hour-block"></div>
    <div id="hr-22" className="hour-block"></div>
    <div id="hr-23" className="hour-block"></div>
    <div id="hr-24" className="hour-block"></div>
    
  </div>;
}

export default Timeline;
