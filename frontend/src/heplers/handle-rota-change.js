import dayjs from "dayjs";

const handleShiftChange = (shiftType, shiftTime, newTime, setCurrentShiftData) => {
    const formattedTime = dayjs(newTime).format("HH:mm");
    setCurrentShiftData((prevData) => {
        let updatedData = { ...prevData };
        updatedData[shiftType][shiftTime] = formattedTime;
        return updatedData;
    });
};

export {
    handleShiftChange,
}

