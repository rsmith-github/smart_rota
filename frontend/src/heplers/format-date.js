// Utility function for date formatting
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().substr(-2);
    const dayOfWeek = date.toLocaleString("en-US", { weekday: "short" });
    const id = `${day}-${month}-${year}`;

    return { id, day, month, year, dayOfWeek };
};

export default formatDate