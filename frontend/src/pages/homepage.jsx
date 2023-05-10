import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import Ring from "../components/3dRing";
import { getCookie } from "../features/user";

function Homepage() {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);

  const accessToken = getCookie("access_token");

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <input type="hidden" id="current-user" value={user} />
      <div className="welcome-text">
        <h2 style={{ marginTop: 0 }}>Welcome</h2>
        <h4>
          Rota management made simple and straightforward for all parties.
        </h4>
        {/* Rota management system where equality comes first. */}
      </div>
      {isAuthenticated && (
        <>
          <Ring />
          <div className="banner page">
            <p>
              <span>Empower</span> your teams. <br />
              Open the door for seamless <span>communication</span> between
              management and team members, prioritizing <span>equality</span>.
            </p>
          </div>
        </>
      )}
      <div id="team" className="page"></div>
      <div className="rota page"></div>
    </div>
  );
}

export default Homepage;
