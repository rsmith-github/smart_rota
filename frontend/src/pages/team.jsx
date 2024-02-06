import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { getCookie } from "../features/user";
import TimeTable from "../components/timetable";
import AppSidebar from "../components/sidebar";

import LoadingScreen from "../components/loading-screen";

import { useSelector } from "react-redux";
import MemberCard from "../components/member-card";

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
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    if (loading) {
      return <LoadingScreen />;
    }
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
              {team
                .sort((a, b) => (a.fields.user_type === "Manager" ? 1 : -1))
                .map((member) => (
                  <MemberCard
                    openMemberForm={openMemberForm}
                    member={member}
                    user_type={member.fields.user_type}
                  />
                ))}
            </div>
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}

export default Team;
