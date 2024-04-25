import { useEffect } from "react";
import {
    HiChartBar,
    HiCurrencyDollar,
    HiCash,
    HiCheckCircle,
    HiFire,
  } from "react-icons/hi";


import { useSelector } from "react-redux";

function DashboardTop() {

  const { user } = useSelector((state) => state.user);
  
  //   Probably going to have to get user's comany name based on company code in order to show it on the dashboard.
  useEffect(() => {
   console.log(user);

  }, {})

  return (
      <><span className="page-location-text">Pages / Dashboard</span><h1 className="page-title">Main Dashboard</h1><div id="dashboard-top">
          <div className="dashboard-item">
              <div className="icon-circle">
                  <HiChartBar size={25} />
              </div>
              <div className="dbrd-item-text-container">
                  <span className="dbrd-item-title">Earnings</span>
                  <p className="dbrd-item-text">--.--</p>
              </div>
          </div>
          <div className="dashboard-item">
              <div className="icon-circle">
                  <HiCurrencyDollar size={25} />
              </div>
              <div className="dbrd-item-text-container">
                  <span className="dbrd-item-title">Spent this month</span>
                  <p className="dbrd-item-text">--.--</p>
              </div>
          </div>
          <div className="dashboard-item">
              <div className="dbrd-item-text-container">
                  <span className="dbrd-item-title">Hours Worked</span>
                  <p className="dbrd-item-text">--.--</p>
              </div>
          </div>
          <div className="dashboard-item">
              <div className="icon-circle">
                  <HiCash size={25} />
              </div>
              <div className="dbrd-item-text-container">
                  <span className="dbrd-item-title">Your balance</span>
                  <p className="dbrd-item-text">--.--</p>
              </div>
          </div>
          <div className="dashboard-item">
              <div className="icon-circle">
                  <HiCheckCircle size={25} />
              </div>
              <div className="dbrd-item-text-container">
                  <span className="dbrd-item-title">Shifts</span>
                  <p className="dbrd-item-text">24</p>
              </div>
          </div>
          <div className="dashboard-item">
              <div className="icon-circle">
                  <HiFire size={25} />
              </div>
              <div className="dbrd-item-text-container">
                  <span className="dbrd-item-title">Company</span>
                  <p className="dbrd-item-text">xyz</p>
              </div>
          </div>
      </div></>
  );
}

export default DashboardTop;
