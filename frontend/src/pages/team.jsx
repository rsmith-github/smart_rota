import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { getCookie } from "../features/user";
import TimeTable from "../components/timetable";

function Team() {
  const [team, setTeam] = useState([
    { id: 123, fields: { username: "DEV", email: "DEV@gmail.com" } }, { id: 123, fields: { username: "jasper", email: "jasper@gmail.com" } }
  ]);

  const [formVisible, setFormVisible] = useState(false);

  const accessToken = getCookie("access_token");

  useEffect(() => {
    async function fetchTeam() {
      const csrftoken = Cookies.get("csrftoken");
      const response = await fetch("http://localhost:8000/api/team", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const jsonData = await response.json();
      setTeam(jsonData);
    }
    fetchTeam();
  }, []);

  const [timeTableOwner, setTimeTableOwner] = useState("");
  const openMemberForm = (e) => {
    setTimeTableOwner(e.currentTarget.getAttribute("data-username"))
    setFormVisible(true);
  };

  
  if (formVisible) {
    return (
      <TimeTable formVisible={formVisible} setFormVisible={setFormVisible} timeTableOwner={timeTableOwner} />
      );
    }
    // DEV
    // if (!accessToken) {
    //   return <Navigate to="/login" />;
    // }
    
  return (
    <>
      {team.length > 0 ? (
        <div id="team">
          {team.map((member) => (
            <div
              className="team-member"
              key={member.id}
              id={"team-member-" + member.id}
              data-username={member.fields.username}
              onClick={openMemberForm}
            >
              <span className="username">{member.fields.username}</span>
              <br />
              {member.fields.email}
            </div>
          ))}
        </div>
      ) : (
        <div
          id="team"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "60vh",
          }}
        >
          <p style={{ fontSize: "40px", fontWeight: "bold", color: "white" }}>
            No team members yet
          </p>
        </div>
      )}
    </>
  );
}

export default Team;
