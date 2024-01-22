import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { login, resetRegistered } from "../features/user";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { HiLockClosed } from "react-icons/hi";

import { motion } from "framer-motion";

function Login() {
  const dispatch = useDispatch();
  const { isAuthenticated, registered } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (registered) dispatch(resetRegistered());
  }, [registered]);

  const { username, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(login({ username, password }));
  };

  if (isAuthenticated) return <Navigate to="/" />;
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
      <div id="login-page-container">
        <div className="login-l-side">
          <h2 className="registerH2">Login</h2>
          <form action="/login" method="post" onSubmit={onSubmit}>
            <div className="">
              <input
                autoFocus
                className="login-input"
                type="text"
                name="username"
                placeholder="Username"
                onChange={onChange}
              />
            </div>
            <div className="">
              <input
                className="login-input"
                type="password"
                name="password"
                placeholder="Password"
                onChange={onChange}
              />
            </div>
            <input
              className="btn primary-button"
              id="login-btn"
              type="submit"
              value="→"
            />
            <div style={{ color: "white" }}>
              Don't have an account?{" "}
              <a href="/register-employee" className="anchor">
                Register here.
              </a>
            </div>
          </form>
        </div>

        <div className="login-r-side">
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{ duration: 1.5, delay: 1 }}
          >
            <div className="auth-icon-border">
              <HiLockClosed className="auth-icon" />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default Login;
