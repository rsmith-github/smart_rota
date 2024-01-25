import dayjs from "dayjs";

const handleMorningShiftStartChange = (_index, newTime, setCurrentShiftData) => {
    const formattedTime = dayjs(newTime).format("HH:mm");
    setCurrentShiftData((prevData) => {
        let updatedData = { ...prevData };
        updatedData.morningShift.start = formattedTime;
        return updatedData;
    });
};

const handleMorningShiftEndChange = (_index, newTime, setTimeTable) => {
    const formattedTime = dayjs(newTime).format("HH:mm");
    setTimeTable((prevTable) => {
        const updatedTime = { ...prevTable };
        updatedTime.morningShift.end = formattedTime;
        return updatedTime;
    });
};

const handleEveningShiftStartChange = (_index, newTime, setTimeTable) => {
    const formattedTime = dayjs(newTime).format("HH:mm");
    setTimeTable((prevTable) => {
        const updatedTime = { ...prevTable };
        updatedTime.eveningShift.start = formattedTime;
        return updatedTime;
    });
};

const handleEveningShiftEndChange = (_index, newTime, setTimeTable) => {
    const formattedTime = dayjs(newTime).format("HH:mm");
    setTimeTable((prevTable) => {
        const updatedTime = { ...prevTable };
        updatedTime.eveningShift.end = formattedTime;
        return updatedTime;
    });
};

export {
    handleMorningShiftStartChange,
    handleMorningShiftEndChange,
    handleEveningShiftStartChange,
    handleEveningShiftEndChange,
}

