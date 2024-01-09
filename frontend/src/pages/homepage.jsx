import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getCookie } from "../features/user";

import About from "../components/aboutus";

import { motion, easeIn } from "framer-motion";

import Spline from "@splinetool/react-spline";

function Homepage() {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);

  const accessToken = getCookie("access_token");

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <input type="hidden" id="current-user" value={user} />
      <motion.div
        className="welcome-text"
        initial={{
          y: 200,
          opacity: 0,
        }}
        transition={{
          duration: 2,
          delay: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
      >
        <h2 style={{ marginTop: 0 }}>Welcome</h2>
        <h4>
          Rota management made simple and straightforward for all parties.
        </h4>
        {/* Rota management system where equality comes first. */}
      </motion.div>
      {isAuthenticated && (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <motion.div
              className="spline-parent"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 1.5,
                ease: "circIn",
              }}
            >
              <Spline scene="https://prod.spline.design/hyBtrdl-OCArwfnd/scene.splinecode" />
            </motion.div>
            <motion.div
              className="banner page"
              initial={{
                y: 180,
                opacity: 0,
              }}
              transition={{
                duration: 2,
                delay: 0.5,
              }}
              whileInView={{
                y: 0,
                opacity: 1,
              }}
            >
              <p>
                <span>Empower</span> your teams. <br />
                Open the door for seamless <span>communication</span> between
                management and team members, prioritizing <span>equality</span>.
              </p>
            </motion.div>
          </div>
          <About />
        </>
      )}
      <div id="team" className="page"></div>
      <div className="rota page"></div>
    </div>
  );
}

export default Homepage;
