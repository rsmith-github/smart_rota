import { viewTeam } from "./team.js";
import { viewRota } from "./rota.js";

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
        navbar.classList.add("sticky");
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



// CS50W history API.

// When back arrow is clicked, show previous section
window.onpopstate = async function (event) {
    await showPage(event.state.page);
}

async function showPage(page) {

    switch (page) {
        case "team":

            await viewTeam();
            break;

        case "rota":
            viewRota();
            console.log("rota");
            break;

        default:
            break;
    }

}


document.querySelectorAll('.spa-link').forEach(spa_link => {
    spa_link.onclick = async function (event) {
        event.preventDefault()


        const page = this.dataset.page;

        // Add the current state to the history
        history.pushState({ page: page }, "", `${page}`);
        await showPage(page);
    };
});

// check if user is logged in. If not, hide overflow. and canvas.
function handleLoggedIn() {
    if (get_current_user().username !== "AnonymousUser") {
        let canvas = document.querySelector("canvas");
        if (canvas) canvas.style.display = "auto";
        document.querySelector("body").style.overflow = "auto";
    } else {
        window.scrollTo({
            top: 0,
            behavior: "auto"
        });
        document.querySelector("#canvas-container").style.display = "none";
        document.querySelector("body").style.overflow = "hidden";
    }
}
handleLoggedIn()

// show page depending on endpoint in url

async function handleEndpoint() {
    let pathname = window.location.pathname;
    pathname = pathname.replace("/", "")
    await showPage(pathname)
}
handleEndpoint()

export { hidePages, showPage, showMenu }