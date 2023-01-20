
// Dropdown menu.
let dMenu = document.querySelector(".dropdown-menu");
if (dMenu) {
    dMenu.style.display = "none";
}

// Call onclick
function showMenu() {
    if (dMenu.style.display == "none") {
        dMenu.style.display = "flex";
    } else if (dMenu.style.display == "flex") {
        dMenu.style.display = "none";
    }
}


// Sticky navbar
window.onscroll = function () { stickyNav() };

let navbar = document.querySelector(".navContainer");
let sticky = navbar.offsetTop;

function stickyNav() {
    if (window.pageYOffset > sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
    }
}

function checkPos() {
    if (scrollY >= 420) {
        document.querySelectorAll("#logo").forEach((element) => element.classList.add("change")) //.classList.add("change")
    } else {
        document.querySelector("#logo").classList.remove("change")
    }
}

document.addEventListener("scroll", checkPos)





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

function viewRota() {
    document.querySelector(".welcome-text").style.display = "none";

    let rota = document.querySelector(".rota")
    rota.style.display = "block";


    date = new Date('2022-01-01')

    datelist = []

    while (date.getFullYear() != 2026) {
        let day = date.getDate()
        if (day.toString().length < 2) {
            day = "0" + day
        }
        let formattedDate = day + " - " + months[date.getMonth()] + " - " + date.getFullYear()
        datelist.push(formattedDate)

        date.setDate(date.getDate() + 1)

    }

    datelist.forEach((element) => {
        let div = document.createElement("div")
        div.className = "date-div"
        div.innerHTML = element
        rota.append(div)
    })

    // date = date.setFullYear(date - 100)
}


// *****************************************
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

// *********************************************