
// Select dropdown menu and hide it if it exists
let dMenu = document.querySelector(".dropdown-menu");
if (dMenu) {
    dMenu.style.display = "none";
}

// Function to toggle dropdown menu visibility when clicked
function showMenu() {
    if (dMenu.style.display == "none") {
        dMenu.style.display = "flex";
    } else if (dMenu.style.display == "flex") {
        dMenu.style.display = "none";
    }
}

// Select navbar and set sticky position
window.onscroll = function () { stickyNav() };
let navbar = document.querySelector(".navContainer");
let sticky = navbar.offsetTop;

// Function to add or remove 'sticky' class based on scroll position
function stickyNav() {
    if (window.pageYOffset > sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
    }
}

// Function to add or remove 'change' class to logo based on scroll position
function checkPos() {
    if (scrollY >= 420) {
        document.querySelectorAll("#logo").forEach((element) => element.classList.add("change")) //.classList.add("change")
    } else {
        document.querySelector("#logo").classList.remove("change")
    }
}

// Add 'checkPos' function to scroll event listener
document.addEventListener("scroll", checkPos);




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
function viewRota(button = "up") {
    // Hide all other pages and display the rota page
    hidePages();
    document.querySelector(".welcome-text").style.display = "none";
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



// get all users where user_type == Employee and company code is the same as request sender's (manager's) company code.
const viewTeam = async () => {
    hidePages();
    let teamContainer = document.querySelector("#team")
    teamContainer.style.display = "block";

    if (teamContainer.childNodes.length) {
        return;
    }

    let team = await fetchData("team");
    document.querySelector(".welcome-text").style.display = "none";
    teamContainer.style.display = "block";

    // Add team member to frontend
    team.forEach(member => {
        let div = document.createElement("div");
        div.innerHTML = `${member.fields.username} ${member.fields.email} ${member.fields.user_type}`;
        teamContainer.append(div);
    })


}

// get current user based on hidden html elements.
function get_current_user() {
    let current_username = document.getElementById("current-user").value;
    let current_user_employer_code = document.getElementById("current-user-company").value;

    let user = {
        username: current_username,
        employer_code: current_user_employer_code,
    };

    return user
}

// hide all pages, to be called when switching in between asynchronously loaded pages.
function hidePages() {
    let pages = document.querySelectorAll(".page");

    pages.forEach(page => {
        page.style.display = "none";
    })

}