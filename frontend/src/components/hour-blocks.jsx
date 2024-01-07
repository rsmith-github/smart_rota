import convertTo24HourFormat from "../heplers/convert-to-24hr";

function HourBlocks({ times }) {
  const hourDivs = [];

  for (let i = 1; i <= 19; i++) {
    const className =
      (i >= times[0] && i <= times[1]) || (i >= times[2] && i <= times[3])
        ? "filled hour-block"
        : "hour-block";
    hourDivs.push(
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "max-content",
            width: "55px",
            margin: "0px 5px 0 5px",
            alignItems: "center",
          }}
        >
          <div key={i} id={`hr-${i}`} className={className}></div>
          <span>{convertTo24HourFormat(i + 5)}</span>
        </div>
      </>
    );
  }

  return <>{hourDivs}</>;
}

export default HourBlocks;
