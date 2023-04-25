// get all users where user_type == Employee and company code is the same as request sender's (manager's) company code.
const viewTeam = async () => {
    hidePages();
    let teamContainer = document.querySelector("#team")
    teamContainer.style.display = "grid";

    if (teamContainer.childNodes.length) {
        return;
    }

    let team = await fetchData("team");

    let welcomeText = document.querySelector(".welcome-text");
    if (welcomeText) welcomeText.style.display = "none";
    teamContainer.style.display = "grid";

    // Add team member to frontend
    team.forEach(member => {
        let div = document.createElement("div");
        div.className = "team-member"
        div.innerHTML = `<span class="username">${member.fields.username}</span> <br /> ${member.fields.email}`;
        teamContainer.append(div);
    })
}
