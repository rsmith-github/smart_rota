// Converts 09-01-25 format to 9-1-25
const convertId = (id) => {

    let split_up = id.split('-');

    let formatted = split_up.map((date) => {

        if (date.length === 2 && date[0] === '0') {
            return date[1]
        }
        return date
    })

    return formatted.join('-')


}

export default convertId;