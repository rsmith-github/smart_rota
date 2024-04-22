import React, { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineUserAdd } from "react-icons/hi";

import { FaRegBuilding } from "react-icons/fa";

function RegisterCompany({ message }) {
  const [companyCode, setCompanyCode] = useState();
  const [companyName, setCompanyName] = useState();

  const checkStatus = async (event) => {
    event.preventDefault();
    const promise = await fetch("http://localhost:8000/register-company", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "company-name": companyName,
      }),
    });
    const jsonData = await promise.json();
    if (jsonData.message) {
      setCompanyCode(jsonData.message);
    } else {
      setCompanyCode(jsonData.code);
    }
  };

  const updateCompanyName = (event) => {
    setCompanyName(event.target.value);
  };

  return (
    <div>
      <motion.div
        className="auth-page"
        initial={{
          y: -80,
          opacity: 0,
        }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 1,
        }}
      >
        <div id="register-page-container">
          <div className="register-l-side">
            <h2 className="registerH2">Register Company</h2>
            <form
              action="/register-company"
              method="post"
              onSubmit={checkStatus}
            >
              <div>
                <input
                  autoFocus
                  className="login-input"
                  type="text"
                  name="company-name"
                  placeholder="Company name"
                  onChange={updateCompanyName}
                />
              </div>
              <input
                className="btn primary-button register-btn"
                type="submit"
                value="submit"
              />
            </form>
            <div className="register-company-message">
              {message && <p>{message}</p>}
              {companyCode && (
                <>
                  <p className="message-text no-margin">Your code is:</p>
                  <p className="no-margin">{companyCode}</p>
                  <p>Please write it down and do not lose it.</p>
                </>
              )}
            </div>
          </div>

          <div className="register-r-side">
            <div className="auth-icon-border">
              <FaRegBuilding className="auth-icon" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default RegisterCompany;
