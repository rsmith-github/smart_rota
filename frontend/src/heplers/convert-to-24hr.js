function convertTo24HourFormat(hour) {
    if (hour < 0) {
        throw new Error("Hour must be greater than 0");
    }

    if (hour === 24) {
        return '00:00'
    }

    return `${hour.toString().padStart(2, '0')}:00`;
}

export default convertTo24HourFormat