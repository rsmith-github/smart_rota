import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { getCookie } from "../features/user";
import TimeTable from "../components/timetable";
import AppSidebar from "../components/sidebar";

import LoadingScreen from "../components/loading-screen";

import { useSelector } from "react-redux";

function Team() {
  const [team, setTeam] = useState([]);

  const [formVisible, setFormVisible] = useState(false);
  const accessToken = getCookie("access_token");

  const { isAuthenticated, loading } = useSelector((state) => state.user);

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
    setTimeTableOwner(e.currentTarget.getAttribute("data-username"));
    setFormVisible(true);
  };

  if (formVisible) {
    return (
      <div className="page-container">
        <AppSidebar />
        <TimeTable
          formVisible={formVisible}
          setFormVisible={setFormVisible}
          timeTableOwner={timeTableOwner}
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      {team.length > 0 ? (
        <div className="page-container">
          <AppSidebar />
          <div className="right-side" style={{ width: "80%" }}>
            <span className="page-location-text">Pages / Team</span>
            <h1 className="page-title">Team Page</h1>
            <div id="team">
              {team.map((member) => (
                <div
                  className="team-member"
                  key={"member-" + member.pk}
                  id={"team-member-" + member.pk}
                  data-username={member.fields.username}
                  onClick={openMemberForm}
                >
                  <span className="username">{member.fields.username}</span>
                  <br />
                  {member.fields.email}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="page-container">
          <AppSidebar />
          <div id="team" className="loading-container">
            <p style={{ fontSize: "40px", fontWeight: "bold", color: "white" }}>
              No team members yet
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Team;
