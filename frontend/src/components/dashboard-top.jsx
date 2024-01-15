import {
    HiChartBar,
    HiCurrencyDollar,
    HiCash,
    HiCheckCircle,
    HiFire,
  } from "react-icons/hi";

function DashboardTop() {
  return (
      <><span className="page-location-text">Pages / Dashboard</span><h1 className="page-title">Main Dashboard</h1><div id="dashboard-top">
          <div className="dashboard-item">
              <div className="icon-circle">
                  <HiChartBar size={25} />
              </div>
              <div className="dbrd-item-text-container">
                  <span className="dbrd-item-title">Earnings</span>
                  <p className="dbrd-item-text">$350.4</p>
              </div>
          </div>
          <div className="dashboard-item">
              <div className="icon-circle">
                  <HiCurrencyDollar size={25} />
              </div>
              <div className="dbrd-item-text-container">
                  <span className="dbrd-item-title">Spent this month</span>
                  <p className="dbrd-item-text">$642.39</p>
              </div>
          </div>
          <div className="dashboard-item">
              <div className="dbrd-item-text-container">
                  <span className="dbrd-item-title">Sales</span>
                  <p className="dbrd-item-text">$574.34</p>
              </div>
          </div>
          <div className="dashboard-item">
              <div className="icon-circle">
                  <HiCash size={25} />
              </div>
              <div className="dbrd-item-text-container">
                  <span className="dbrd-item-title">Your balance</span>
                  <p className="dbrd-item-text">$1000</p>
              </div>
          </div>
          <div className="dashboard-item">
              <div className="icon-circle">
                  <HiCheckCircle size={25} />
              </div>
              <div className="dbrd-item-text-container">
                  <span className="dbrd-item-title">New Tasks</span>
                  <p className="dbrd-item-text">154</p>
              </div>
          </div>
          <div className="dashboard-item">
              <div className="icon-circle">
                  <HiFire size={25} />
              </div>
              <div className="dbrd-item-text-container">
                  <span className="dbrd-item-title">Total Projects</span>
                  <p className="dbrd-item-text">2935</p>
              </div>
          </div>
      </div></>
  );
}

export default DashboardTop;
