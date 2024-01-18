import { useState } from "react";

import TimeRow from "../components/timeRow";
import Timeline from "../components/timeline";
import convertId from "../heplers/convertId";
import { motion } from "framer-motion";

function DateDiv({
  date,
  animationClass,
  handleAnimationEnd,
  shiftsData,
  user,
}) {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    setOpened(!opened);
  };

  const shiftData = shiftsData[convertId(date.id)];

  const currentShiftData = {
    date: date.id,
    morningShift: {
      start: shiftData?.morning_shift.split("-")[0],
      end: shiftData?.morning_shift.split("-")[1],
    },
    eveningShift: {
      start: shiftData?.evening_shift.split("-")[0],
      end: shiftData?.evening_shift.split("-")[1],
    },
  };

  return (
    <div
      id={date.id}
      className={`date-div ${animationClass}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <div dangerouslySetInnerHTML={{ __html: date.string_format }} />
      {shiftData ? (
        // Shift data display logic
        <>
          <span className="shift-text">
            <span className="shift-title">🌞 : </span>
            {shiftData?.morning_shift}
          </span>
          <br />
          {user.user_type === "Employee" ? (
            <>
              <div className="request-change-container">
                <span className="shift-text">
                  <span className="shift-title">🌙 : </span>
                  {shiftData?.evening_shift}
                </span>
                <div>
                  <span>Something wrong?</span>
                  {!opened ? (
                    <button
                      className="primary-button"
                      id="request-change-button"
                      onClick={handleOpen}
                    >
                      Request Change
                    </button>
                  ) : (
                    <button
                      className="primary-button"
                      id="request-save-button"
                      onClick={handleOpen}
                    >
                      Save Changes
                    </button>
                  )}
                </div>
              </div>
              <form action="">
                {opened && (
                  <motion.div
                    className="rota-timepicker"
                    initial={{
                      height: 0,
                      margin: 0,
                    }}
                    transition={{
                      duration: 1,
                      delay: 0,
                    }}
                    animate={{
                      //   opacity: 1,
                      height: 60,
                      margin: 35,
                    }}
                  >
                    <motion.div
                      initial={{
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.5,
                        delay: 0.5,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                    >
                      <TimeRow
                        day={currentShiftData}
                        // index={index}
                        // handleEveningShiftStartChange={handleEveningShiftStartChange}
                        // handleEveningShiftEndChange={handleEveningShiftEndChange}
                        // handleMorningShiftStartChange={handleMorningShiftStartChange}
                        // handleMorningShiftEndChange={handleMorningShiftEndChange}
                      />
                    </motion.div>
                  </motion.div>
                )}
              </form>
            </>
          ) : (
            <span className="shift-text">
              <span className="shift-title">🌙 : </span>
              {shiftData?.evening_shift}
            </span>
          )}
        </>
      ) : (
        // Display for day off
        <>
          <span className="shift-title day-off"> day off</span>
          <span className="emoji">😴</span>
          {/* {shiftsData && (
              <Timeline dateId={date.id} shift={shiftsData[convertId(date.id)]} />
            )} */}
        </>
      )}
      {shiftData && <Timeline dateId={date.id} shift={shiftData} />}
    </div>
  );
}

export default DateDiv;
