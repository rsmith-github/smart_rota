import TimeRow from "./timeRow";
function TimeTableSkeleton() {
  const elements = [];
  for (let i = 0; i <= 3; i++) {
    elements.push(
      <TimeRow
        day={{
          date: "..-..-..",
          morningShift: { start: "--:--", end: "--:--" },
          eveningShift: { start: "--:--", end: "--:--" },
        }}
      />
    );
  }

  return (
    <>
      {elements.map((element) => {
        return element;
      })}
    </>
  );
}

export default TimeTableSkeleton;
