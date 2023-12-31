import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { register } from "../features/user";
import { Navigate } from "react-router-dom";

function RegisterEmployee() {
  const dispatch = useDispatch();
  const { registered, loading } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    employer_code: "",
    username: "",
    email: "",
    password: "",
    user_type: "Employee",
  });

  const { employer_code, username, email, password, user_type } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(register({ employer_code, username, email, password, user_type }));
  };

  if (registered) return <Navigate to="/login" />;
  return (
    <form action="/register-employee" method="post" onSubmit={onSubmit}>
      <h2>Register as Team Member</h2>

      <div>
        <p
          className="info"
          title="Please enter the code provided by your employer"
        >
          ?
        </p>
        <input
          name="employer_code"
          className=""
          type="text"
          placeholder="Company code"
          onChange={onChange}
        />
      </div>
      <div>
        <input
          className=""
          autoFocus
          type="text"
          name="username"
          placeholder="Username"
          onChange={onChange}
        />
      </div>
      <div>
        <input
          className=""
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={onChange}
        />
      </div>
      <div>
        <input
          className=""
          type="password"
          name="password"
          placeholder="Password"
          onChange={onChange}
        />
      </div>
      {/* <div>
        <input
          className=""
          type="password"
          name="confirmation"
          placeholder="Confirm Password"
          onChange={onChange}
        />
      </div> */}
      <input className="btn" type="submit" value="Register" />
    </form>
  );
}

export default RegisterEmployee;
