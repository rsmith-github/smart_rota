import React from 'react';

function RegisterCompany({ message }) {
    console.log("react register company");

    return (
        <div>
            <h2 className="registerH2">Register your company here</h2>
            <p style={{ color: 'white' }}>{message}</p>

            <form action="/register-company" method="post">
                <input autoFocus className="" type="text" name="company-name" placeholder="Company name" />
                <input className="btn" type="submit" value="submit" />
            </form>

            Don't have an account? <a href="/register">Register here.</a>
        </div>
    );
}

export default RegisterCompany;
