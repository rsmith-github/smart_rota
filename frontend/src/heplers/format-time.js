
// convert e.g. 12:00-15:00 --> { morningShiftStart: 7, morningShiftEnd: 10 } (7 and 10 representing the 7th and 10th block)
const formatTime = (timeRange) => {

    let split = timeRange.split('-');

    let hours = split.map(time => {
        const [hourStr, minStr] = time.split(':');
        const hour = hourStr === '00' ? 19 : Number(hourStr) - 5;
        const min = Number(minStr);

        return { hour, min };
    });



    return hours;

}

export default formatTime