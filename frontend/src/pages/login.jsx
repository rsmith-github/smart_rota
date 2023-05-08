import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { login, resetRegistered } from "../features/user";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const { loading, isAuthenticated, registered } = useSelector(
    (state) => state.user
  );

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
    <div>
      <h2 className="registerH2">Login</h2>
      {/* {message && <div>{message}</div>} */}
      <form action="/login" method="post" onSubmit={onSubmit}>
        <div className="">
          <input
            autoFocus
            className=""
            type="text"
            name="username"
            placeholder="Username"
            onChange={onChange}
          />
        </div>
        <div className="">
          <input
            className=""
            type="password"
            name="password"
            placeholder="Password"
            onChange={onChange}
          />
        </div>
        <input className="btn" type="submit" value="Login" />
      </form>
      Don't have an account? <a href="/register-employee">Register here.</a>
    </div>
  );
}

export default Login;
