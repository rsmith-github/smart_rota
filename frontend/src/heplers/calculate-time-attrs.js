function calculateTimeAttributes(i, times) {
    let flip = '';
    /* 
        times looks like:
        {
          "hour": 16,
          "min": 15
        }
    */
    // Determine the flip value based on the current hour (i)
    // No flip for times[1] and times[3], flip for times[0] and times[2]
    if (i === times[1]?.hour || i === times[3]?.hour) {
        flip = '';
    } else if (i === times[0]?.hour || i === times[2]?.hour) {
        flip = ' flip';
    }

    // Find the time object that matches the current hour
    let matchedTime = times.find(time => i === time?.hour);

    // If a matching time is found, set element_to_add_minutes and minutes_to_add
    let element_to_add_minutes = matchedTime ? i : null;
    let minutes_to_add = matchedTime ? matchedTime.min : null;

    // Handle special cases:
    // - If it's the start of the shift and 45 minutes past the hour, adjust minutes and flip
    // - If it's the end of the shift and 15 minutes past the hour, adjust minutes and flip
    if (matchedTime) {
        if (i === times[0]?.hour && times[0]?.min === 45) {
            minutes_to_add = 45;
            flip += ' shift-start-45';
        } else if ((i === times[1]?.hour && times[1]?.min === 15) || (i === times[3]?.hour && times[3]?.min === 15)) {
            minutes_to_add = 15;
            flip += ' shift-end-45';
        }
    }

    // Return the calculated attributes
    return [element_to_add_minutes, minutes_to_add, flip];
}

export default calculateTimeAttributes;
