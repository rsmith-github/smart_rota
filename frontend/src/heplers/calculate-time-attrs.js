function calculateTimeAttributes(i, times) {
    let flip = '';

    // Determine flip value
    if (i === times[1]?.hour || i === times[3]?.hour) {
        flip = '';
    } else if (i === times[0]?.hour || i === times[2]?.hour) {
        flip = ' flip';
    }

    // Check if the current hour matches any of the times and set values accordingly
    let matchedTime = times.find(time => i === time?.hour);
    let element_to_add_minutes = matchedTime ? i : null;
    let minutes_to_add = matchedTime ? matchedTime.min : null;

    // Handle special cases for shift start and end times
    if (matchedTime) {
        if (i === times[0]?.hour && times[0]?.min === 45) {
            minutes_to_add = 45;
            flip += ' shift-start-45';
        } else if ((i === times[1]?.hour && times[1]?.min === 15) || (i === times[3]?.hour && times[3]?.min === 15)) {
            minutes_to_add = 15;
            flip += ' shift-end-45';
        }
    }

    return [element_to_add_minutes, minutes_to_add, flip];
}

export default calculateTimeAttributes;
