function calculateTimeAttributes(i, times, element_to_add_minutes, minutes_to_add, flip) {
console.log("🤠 ~ file: calculate-time-attrs.js:2 ~ calculateTimeAttributes ~ times:", times)

    if (i === times[1]?.hour || i === times[3]?.hour) {
        element_to_add_minutes = i;
        minutes_to_add = times[1]?.min || times[3]?.min;
        flip = '';
      }
  
      if (i === times[0]?.hour || i === times[2]?.hour) {
        element_to_add_minutes = i;
        minutes_to_add = times[0]?.min || times[2]?.min;
        flip = ' flip';
      }

      if ( i === times[0]?.hour && times[0]?.min === 45) {
        element_to_add_minutes = i;
        minutes_to_add = null;

        flip += ' shift-start-45'
      }

    return [element_to_add_minutes, minutes_to_add, flip];
}

export default calculateTimeAttributes