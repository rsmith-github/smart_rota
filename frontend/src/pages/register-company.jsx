import React, { useState } from "react";

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
      <h2 className="registerH2">Register your company here</h2>
      {message && <p style={{ color: "white" }}>{message}</p>}
      {companyCode && (
        <p style={{ color: "white" }}>
          Your code is: {companyCode}. DO NOT LOSE IT.
        </p>
      )}
      <form action="/register-company" method="post" onSubmit={checkStatus}>
        <input
          autoFocus
          className=""
          type="text"
          name="company-name"
          placeholder="Company name"
          onChange={updateCompanyName}
        />
        <input className="btn" type="submit" value="submit" />
      </form>
      Don't have an account? <a href="/register">Register here.</a>
    </div>
  );
}

export default RegisterCompany;
