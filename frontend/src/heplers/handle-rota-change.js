import dayjs from "dayjs";

const handleShiftChange = (shiftType, shiftTime, newTime, setCurrentShiftData, isList = false, dayIndex) => {

    const formattedTime = dayjs(newTime).format("HH:mm");
    setCurrentShiftData((prevData) => {
        let updatedData = isList ? [...prevData] : { ...prevData }
        if (isList) {
            updatedData[dayIndex][shiftType][shiftTime] = formattedTime;
        } else {
            updatedData[shiftType][shiftTime] = formattedTime;
        }
        return updatedData;
    });

};

export default handleShiftChange;


