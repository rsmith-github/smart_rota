import { useState, useEffect } from "react";

import TimeRow from "../components/timeRow";
import Timeline from "../components/timeline";
import convertId from "../heplers/convertId";
import { motion, AnimatePresence } from "framer-motion";

import handleShiftChange from "../heplers/handle-rota-change";

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

  const sendChangeRequest = async (newShift) => {
    await fetch("/api/request-change", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user,
        newShift: newShift,
      }),
    });
  };

  const shiftData = shiftsData[convertId(date.id)];

  const [currentShiftData, setCurrentShiftData] = useState({
    date: date.id,
    morningShift: {
      start: "",
      end: "",
    },
    eveningShift: {
      start: "",
      end: "",
    },
  });

  useEffect(() => {
    if (shiftData) {
      setCurrentShiftData({
        date: date.id,
        morningShift: {
          start: shiftData.morning_shift.split("-")[0],
          end: shiftData.morning_shift.split("-")[1],
        },
        eveningShift: {
          start: shiftData.evening_shift.split("-")[0],
          end: shiftData.evening_shift.split("-")[1],
        },
      });
    }
  }, [shiftData, date.id]);

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
                      onClick={() => {
                        handleOpen();
                        sendChangeRequest(currentShiftData);
                      }}
                    >
                      Save Changes
                    </button>
                  )}
                </div>
              </div>
              <form action="">
                <AnimatePresence>
                  {opened && (
                    <motion.div
                      className="rota-timepicker"
                      initial={{
                        height: 0,
                        margin: 0,
                      }}
                      animate={{
                        height: 60,
                        margin: 35,
                      }}
                      exit={{
                        height: 0,
                        margin: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 1,
                      }}
                    >
                      <motion.div
                        initial={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: 1,
                        }}
                        transition={{
                          duration: 0.5,
                          delay: 0.5,
                        }}
                      >
                        <TimeRow
                          day={currentShiftData}
                          handleEveningShiftStartChange={(_index, newTime) => {
                            handleShiftChange(
                              "eveningShift",
                              "start",
                              newTime,
                              setCurrentShiftData
                            );
                          }}
                          handleEveningShiftEndChange={(_index, newTime) => {
                            handleShiftChange(
                              "eveningShift",
                              "end",
                              newTime,
                              setCurrentShiftData
                            );
                          }}
                          handleMorningShiftStartChange={(_index, newTime) => {
                            handleShiftChange(
                              "morningShift",
                              "start",
                              newTime,
                              setCurrentShiftData
                            );
                          }}
                          handleMorningShiftEndChange={(_index, newTime) => {
                            handleShiftChange(
                              "morningShift",
                              "end",
                              newTime,
                              setCurrentShiftData
                            );
                          }}
                        />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
