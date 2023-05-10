import React from "react";

function Register(props) {
  return (
    <div>
      <h2 className="registerH2">Register {props.user_type}</h2>
      {/* {props.message && <div>{props.message}</div>} */}
      {props.user_type === "employer" ? (
        <form action="/register_manager" method="post">
          <div>
            <p
              className="info"
              title="Please enter the code provided by your employer"
            >
              ?
            </p>
            <input
              name="employer-code"
              className=""
              type="text"
              placeholder="Company code"
            />
          </div>
          <div>
            <input
              className=""
              autoFocus
              type="text"
              name="username"
              placeholder="Username"
            />
          </div>
          <div>
            <input
              className=""
              type="email"
              name="email"
              placeholder="Email Address"
            />
          </div>
          <div>
            <input
              className=""
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <div>
            <input
              className=""
              type="password"
              name="confirmation"
              placeholder="Confirm Password"
            />
          </div>
          <input className="btn" type="submit" value="Register" />
        </form>
      ) : (
        <form action="/register" method="post">
          <div>
            <p
              className="info"
              title="Please enter the code provided by your employer"
            >
              ?
            </p>
            <input
              name="employer-code"
              className=""
              type="text"
              placeholder="Company code"
            />
          </div>
          <div>
            <input
              className=""
              autoFocus
              type="text"
              name="username"
              placeholder="Username"
            />
          </div>
          <div>
            <input
              className=""
              type="email"
              name="email"
              placeholder="Email Address"
            />
          </div>
          <div>
            <input
              className=""
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <div>
            <input
              className=""
              type="password"
              name="confirmation"
              placeholder="Confirm Password"
            />
          </div>
          <input className="btn" type="submit" value="Register" />
        </form>
      )}
      Already have an account? <a href="/login">Log In here.</a>
    </div>
  );
}

export default Register;
