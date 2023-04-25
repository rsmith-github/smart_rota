

import { showTimeline } from './d3.js';
import { hidePages } from './main.js';
import { fetchData } from './APIhelper.js';

// Create months object to format months in date.
let months = {}
function createMonthsObj() {
    let list = ["Jan", "Feb", "March", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let count = 0
    list.forEach((month) => {
        months[count] = month;
        count++
    })
}
createMonthsObj();


// Define the start and end dates of the current week
let startOfWeek = null;
let endOfWeek = null;
export function viewRota(button = "up") {
    // Hide all other pages and display the rota page
    hidePages();

    let welcomeText = document.querySelector(".welcome-text");
    if (welcomeText) welcomeText.style.display = "none";

    let rota = document.querySelector(".rota");
    rota.style.display = "flex";

    // Initialize the start and end dates of the current week if they haven't been set yet
    if (!startOfWeek || !endOfWeek) {
        let today = new Date();
        startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
        endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 6);
    }

    // Loop through all the dates between the start of the current week and the end of the current week and format them using the months object
    let date = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate());
    let datelist = [];

    while (date <= endOfWeek) {
        let day = date.getDate();
        if (day.toString().length < 2) {
            day = "0" + day;
        }
        let formattedDate = new Date(date.getTime()).toLocaleString('en-US', { weekday: 'short' }) + "<br/>" + day + " - " + months[date.getMonth()] + " - " + date.getFullYear();
        datelist.push(formattedDate);
        date.setDate(date.getDate() + 1);
    }


    // Display the filtered dates on the page
    rota.innerHTML = "";
    datelist.forEach((element) => {
        let div = document.createElement("div");
        div.className = "date-div";
        if (button === "up") {
            div.classList.add("slide-up")
        } else if (button === "left") {
            div.classList.add("slide-in-left")
        } else if (button === "right") {
            div.classList.add("slide-in-right")
        }
        div.innerHTML = element;
        console.log(element);
        rota.append(div);
    });

    // remove animations on animation end.
    window.addEventListener("animationend", (event) => {
        event.target.classList.remove("slide-up")
        event.target.classList.remove("slide-in-left")
        event.target.classList.remove("slide-out-left")
        event.target.classList.remove("slide-in-right")
    })

    // Add buttons to navigate to the previous and next weeks
    let prevButton = document.createElement("button");
    prevButton.className = "weeks-button";
    prevButton.innerHTML = "Previous Week";
    prevButton.addEventListener("click", () => {
        document.querySelectorAll(".date-div").forEach((element) => {
            element.classList.add("fade");
        })
        // Set a timeout to allow time for the slide-out-left animation to finish
        setTimeout(() => {
            startOfWeek.setDate(startOfWeek.getDate() - 7);
            endOfWeek.setDate(endOfWeek.getDate() - 7);
            viewRota("right");
        }, 500); // adjust the timeout duration to match the animation duration, in this case, 500ms or 0.5s
    });

    let nextButton = document.createElement("button");
    nextButton.className = "weeks-button"
    nextButton.innerHTML = "Next Week";
    nextButton.addEventListener("click", () => {

        document.querySelectorAll(".date-div").forEach((element) => {
            element.classList.add("fade");
        })
        // Set a timeout to allow time for the slide-out-left animation to finish
        setTimeout(() => {
            startOfWeek.setDate(startOfWeek.getDate() + 7);
            endOfWeek.setDate(endOfWeek.getDate() + 7);
            viewRota("left");
        }, 500); // adjust the timeout duration to match the animation duration, in this case, 500ms or 0.5s
    });


    // make parent container for buttons
    let buttonsContainer = document.createElement("div");
    buttonsContainer.id = "buttons-container";
    buttonsContainer.append(prevButton);
    buttonsContainer.append(nextButton);

    // append buttons parent.
    rota.prepend(buttonsContainer);

    showTimeline();

}


function countLeapYears(date) {
    date.setFullYear(date.getFullYear())
    let leapYearCount = 0
    // Go down year by year until year is equal to 1.
    while (date.getFullYear() != 1) {
        date.setFullYear(date.getFullYear() - 1)
        if (isLeapYear(date)) {
            leapYearCount++
        }
    }
    return leapYearCount
}

function isLeapYear(date) {

    // Set the date to february 29
    date.setDate(29)
    date.setMonth(1)

    // If month doesn't switch to march, return true.
    return date.getMonth() == 1 && date.getDate() == 29
}