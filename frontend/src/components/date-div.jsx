import { useState, useEffect } from "react";

import TimeRow from "../components/timeRow";
import Timeline from "../components/timeline";
import convertId from "../heplers/convertId";
import { motion, AnimatePresence } from "framer-motion";
import { HiUser } from "react-icons/hi";

import { getCookie } from "../features/user";

import handleShiftChange from "../heplers/handle-rota-change";

function DateDiv({
  date,
  animationClass,
  handleAnimationEnd,
  shiftsData,
  user,
  from_user,
  oldShifts,
}) {
  const [opened, setOpened] = useState(false);

  const [accepted, setAccepted] = useState(false);

  const handleOpen = () => {
    setOpened(!opened);
  };

  const sendChangeRequest = async (newShift) => {
    await fetch("/api/request-change", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getCookie("access_token")}`,
      },
      body: JSON.stringify({
        user: user,
        newShift: newShift,
      }),
    });
  };

  // get data of old shift and shift from change request.
  const shiftData = shiftsData[convertId(date.id)];

  let oldShiftData;

  // check if morning shift or evening shift changed
  let morningShiftChanged = false;
  let eveningShiftChanged = false;

  if (oldShifts) {
    oldShiftData = oldShifts[convertId(date.id)];
    morningShiftChanged =
      shiftData.morning_shift.trim() !== oldShiftData.morning_shift.trim();
    eveningShiftChanged =
      shiftData.evening_shift.trim() !== oldShiftData.evening_shift.trim();
  }

  // currentShiftData is to display on /timetable and for passing to TimeRow
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

  const acceptChanges = async () => {
    await fetch("/api/accept-change-request", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getCookie("access_token")}`,
      },
      body: JSON.stringify({
        from_user: from_user,
        user: user,
        shiftData: shiftData,
        date: date.id,
      }),
    });

    setAccepted(true);
  };

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
      style={{
        display: accepted ? "none" : "block",
      }}
    >
      {user.user_type === "Manager" && oldShifts ? (
        <div className="flex-center-between">
          <div dangerouslySetInnerHTML={{ __html: date.string_format }} />
          <span className="shift-title from-user flex-center-between">
            <HiUser /> - {from_user}
          </span>
        </div>
      ) : (
        <>
          <span className="shift-title from-user">{from_user}</span>
          <div dangerouslySetInnerHTML={{ __html: date.string_format }} />
        </>
      )}
      {shiftData ? (
        // Shift data display logic
        <>
          <span className="shift-text">
            <span className="shift-title">🌞 : </span>
            {oldShifts &&
              oldShifts[convertId(date.id)]?.morning_shift.trim() !==
                shiftData?.morning_shift.trim() && (
                <span className="strike-through">
                  {oldShifts[convertId(date.id)]?.morning_shift}
                </span>
              )}{" "}
            {shiftData?.morning_shift.trim() === "99:99-99:99"
              ? "--:-- - --:--"
              : shiftData?.morning_shift}
          </span>
          <br />
          {user.user_type === "Employee" && (
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
          )}

          {user.user_type === "Manager" && (
            <span className="shift-text flex-center-between">
              <div>
                <span className="shift-title">🌙 : </span>
                {oldShifts &&
                  oldShifts[convertId(date.id)]?.evening_shift.trim() !==
                    shiftData?.evening_shift.trim() && (
                    <span className="strike-through">
                      {oldShifts[convertId(date.id)]?.evening_shift}
                    </span>
                  )}{" "}
                {shiftData?.evening_shift}
              </div>

              {oldShifts && (
                <button
                  className="primary-button"
                  id="accept-changes-button"
                  onClick={acceptChanges}
                >
                  Accept Changes
                </button>
              )}
            </span>
          )}
        </>
      ) : (
        // Display for day off
        <>
          <span className="shift-title day-off"> day off</span>
          <span className="emoji">😴</span>
        </>
      )}
      {shiftData && (
        <Timeline
          dateId={date.id}
          shift={shiftData}
          morningShiftChanged={morningShiftChanged}
          eveningShiftChanged={eveningShiftChanged}
        />
      )}
    </div>
  );
}

export default DateDiv;
