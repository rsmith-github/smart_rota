import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { register } from "../features/user";
import { Navigate } from "react-router-dom";

import { motion } from "framer-motion";

import { HiOutlineUserCircle } from "react-icons/hi";
import { resetRegistered } from "../features/user";

const RegisterManager = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    employer_code: "",
    username: "",
    email: "",
    password: "",
    user_type: "Manager",
  });

  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));
    dispatch(resetRegistered());
  }, [dispatch]);

  const { employer_code, username, email, password, user_type } = formData;
  const registrationStatus = useSelector((state) => state.user.registered);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ employer_code, username, email, password, user_type }));
  };

  if (registrationStatus) {
    return <Navigate to="/login" replace />;
  }

  return (
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
          {!matches && (
            <div className="auth-icon-border">
              <HiOutlineUserCircle className="auth-icon" />
            </div>
          )}
          <h2 className="registerH2">Manager Profile</h2>
          <form action="/register-employer" method="post" onSubmit={onSubmit}>
            <div>
              <input
                name="employer_code"
                className="login-input"
                type="text"
                placeholder="Company code"
                onChange={onChange}
              />
            </div>
            <div>
              <input
                className="login-input"
                autoFocus
                type="text"
                name="username"
                placeholder="Username"
                onChange={onChange}
              />
            </div>
            <div>
              <input
                className="login-input"
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={onChange}
              />
            </div>
            <div>
              <input
                className="login-input"
                type="password"
                name="password"
                placeholder="Password"
                onChange={onChange}
              />
            </div>
            <input
              className="btn primary-button register-btn"
              type="submit"
              value="Register"
            />
          </form>
        </div>

        {matches && (
          <div className="register-r-side">
            <div className="auth-icon-border" style={{ display: "flex" }}>
              <HiOutlineUserCircle className="auth-icon" />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default RegisterManager;
