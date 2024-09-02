import React, { useState, useCallback } from "react";
import Calendar from "react-calendar";

const HighlightedDatesCalendar = () => {
  const [date, onChange] = useState(new Date());
  const [highlightedDates, setHighlightedDates] = useState([
    new Date("Thu Sep 19 2024"),
  ]);

  const tileClassName = useCallback(
    ({ date }) => {
      return highlightedDates.includes(date) ? "bg-red-200" : "bg-red-200";
    },
    [highlightedDates]
  );

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={date}
        tileClassName={tileClassName}
        onClickDay={(date) => console.log(date)}
      />
    </div>
  );
};

export default HighlightedDatesCalendar;

// onClickDay={(date) => console.log(date)}
