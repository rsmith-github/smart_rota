function HourBlocks({ times }) {
  const hourDivs = [];

  for (let i = 1; i <= 19; i++) {
    const className =
      i >= times[0] && i <= times[1] ? "filled hour-block" : "hour-block";
    hourDivs.push(<div key={i} id={`hr-${i}`} className={className}></div>);
  }

  return <>{hourDivs}</>;
}

export default HourBlocks;
