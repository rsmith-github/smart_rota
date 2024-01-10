import React from "react";
import { ReactDOM } from "react";

function Footer() {
  return (
    <footer className="text-center footer text-center">
      <div className="container">
        {/* Logo Start */}
        <div className="col-md-4">
          <h4>
            R. W. <span className="Analyst">Smith</span>
          </h4>

          <p className="copy-right">
            Copyright © 2008-2019 R. Smith Technology. All Rights Reserved.
          </p>
        </div>
        {/* Logo end */}

        {/* Solutions Start */}
        <div className="footer-column">
          <h5>Solutions</h5>
          <ul className="list-style">
            <li>Staff bruh</li>
            <li>Equal Opportunity</li>
            <li>R&D / Market Intelligence</li>
            <li>M&A Opportunity and Due Diligence</li>
            <li>Litigation Risk Assessment and Strategy</li>
            <li>Patent Prosecution</li>
          </ul>
        </div>
        {/* Solutions end */}

        {/* Quick links Start */}
        <div className="footer-column">
          <h5>Quick links</h5>
          <ul className="list-style">
            <li>Empower</li>
            <li>Insight</li>
            <li>Corporation</li>
          </ul>
        </div>
        {/* Quick links end */}

        {/* Other Start */}
        <div className="footer-column">
          <h5>Other</h5>
          <ul className="list-style">
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
            <li>Features</li>
            <li>Success Stories</li>
            <li>Contact Us</li>
          </ul>
        </div>
        {/* Other end */}
      </div>
    </footer>
  );
}

export default Footer;
