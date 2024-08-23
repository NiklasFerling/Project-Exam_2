import ReactCalendar from "react-calendar";

const datesToAddClassTo = [tomorrow, in3Days, in5Days];

function tileClassName({ date, view }) {
  // Add class to tiles in month view only
  if (view === "month") {
    // Check if a date React-Calendar wants to check is on the list of dates to add class to
    if (datesToAddClassTo.find((dDate) => isSameDay(dDate, date))) {
      return "myClassName";
    }
  }
}

function Calendar() {
  return (
    <div>
      <ReactCalendar
        minDate={new Date()}
        view="month"
        onClickDay={(date) => console.log(date)}
        tileClassName={tileClassName}
      />
    </div>
  );
}
export default Calendar;
