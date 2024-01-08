function calculateTimeAttributes(i, times, element_to_add_minutes, minutes_to_add, flip) {

    if (i === times[1]?.hour || i === times[3]?.hour) {
        flip = '';
    }

    if (i === times[0]?.hour || i === times[2]?.hour) {
        flip = ' flip';
    }


    if (i === times[0]?.hour || i === times[1]?.hour || i === times[2]?.hour || i === times[3]?.hour) {
        element_to_add_minutes = i;
    }

    if (i === times[0]?.hour) {
        minutes_to_add = times[0]?.min
    }
    if (i === times[1]?.hour) {
        minutes_to_add = times[1]?.min;
    }
    if (i === times[2]?.hour) {
        minutes_to_add = times[2]?.min
    }
    if (i === times[3]?.hour) {
        minutes_to_add = times[3]?.min;
    }

    // handle shift start 15/45 minutes
    if (i === times[0]?.hour && times[0]?.min === 45) {
        element_to_add_minutes = i;
        minutes_to_add = 45;
        flip += ' shift-start-45'
    }

    // handle shift end 15/45 minutes
    if (i === times[1]?.hour && times[1].min === 15 || i === times[3]?.hour && times[3].min === 15) {
        element_to_add_minutes = i;
        minutes_to_add = 15;
        flip += ' shift-end-45'
    }

    return [element_to_add_minutes, minutes_to_add, flip];
}

export default calculateTimeAttributes