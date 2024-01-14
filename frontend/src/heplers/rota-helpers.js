

const getDates = (startOfWeek, endOfWeek, months) => {
    let date = new Date(
        startOfWeek.getFullYear(),
        startOfWeek.getMonth(),
        startOfWeek.getDate()
    );
    let datelist = [];

    while (date <= endOfWeek) {
        let day = date.getDate().toString().padStart(2, "0");
        let month = (date.getMonth() + 1).toString().padStart(2, "0");
        let year = date.getFullYear().toString().substr(-2);
        let dayOfWeek = new Date(date.getTime()).toLocaleString("en-US", {
            weekday: "short",
        });

        let formattedDate = {
            string_format: `
        <span class='dow'>${dayOfWeek}</span> | 
        <span class='date'>${day} - ${months[date.getMonth()]} - ${year}</span>
        `,

            id: `${day}-${month}-${year}`,
        };

        datelist.push(formattedDate);
        date.setDate(date.getDate() + 1);
    }

    return datelist;
};



export { getDates }