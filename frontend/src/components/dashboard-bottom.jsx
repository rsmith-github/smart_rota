import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

function DashboardBottom() {
  const data = [
    { name: "Jan", hw: 400 },
    { name: "Feb", hw: 500 },
    { name: "Mar", hw: 100 },
    { name: "Apr", hw: 200 },
    { name: "May", hw: 100 },
    { name: "Jun", hw: 300 },
    { name: "Jul", hw: 400 },
    { name: "Aug", hw: 350 },
    { name: "Sep", hw: 450 },
    { name: "Oct", hw: 250 },
    { name: "Nov", hw: 350 },
    { name: "Dec", hw: 600 },
  ];
  return (
    <div className="dashboard-bottom-container">
      <div id="dashboard-bottom">
        <div className="dbrd-bottom-quarter">
          <div>
            <h3 style={{ textAlign: "center" }}>Hours Worked</h3>
            <LineChart width={500} height={250} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <Line
                type="monotone"
                dataKey="hw"
                stroke="springgreen"
                strokeWidth={2}
              />
              <XAxis dataKey="name" stroke="white" />
              <YAxis stroke="white" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(35, 16, 111, 0.553)",
                  borderRadius: "10px",
                }}
              />
              <Legend />
            </LineChart>
          </div>
        </div>
        <div className="dbrd-bottom-quarter"></div>
        <div className="dbrd-bottom-quarter"></div>
        <div className="dbrd-bottom-quarter no-background">
          <div className="dbrd-bottom-eigth"></div>
          <div className="dbrd-bottom-eigth"></div>
        </div>
      </div>
    </div>
  );
}

export default DashboardBottom;
