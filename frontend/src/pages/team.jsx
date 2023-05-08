import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

function Team() {
  const [team, setTeam] = useState([]);

  const accessToken = localStorage.getItem("access_token");

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

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {team.length > 0 ? (
        <div id="team">
          {team.map((member) => (
            <div className="team-member" key={member.id}>
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
