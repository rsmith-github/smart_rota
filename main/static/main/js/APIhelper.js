// Send JSON data to backend "views" in order to save to database.
async function sendJsonToBackend(endpoint, ...args) {

    switch (endpoint) {
        case "team":
            await fetch(`/api/${endpoint}`, {
                method: "POST",
                headers: {
                    "X-CSRFToken": getCookie("csrftoken"),
                },
                body: JSON.stringify({
                    company_code: args[0],
                    employee_type: args[1], // make sure manager is sending the request
                }),
            });
            break;
        default:
            break;
    }
}


function getCookie(cname) {
    const cookies = Object.fromEntries(
        document.cookie.split(/; /).map(c => {
            const [key, v] = c.split('=', 2);
            return [key, decodeURIComponent(v)];
        }),
    );
    return cookies[cname] || '';
}


export async function fetchData(name) {

    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "X-CSRFToken": getCookie("csrftoken"),
    };


    switch (name) {
        case "team":
            // Fetch users
            let team = []
            team = await fetch(`/api/${name}`, { method: "POST", headers });
            team = await team.json();
            return team
        default:
            break;

    }
}