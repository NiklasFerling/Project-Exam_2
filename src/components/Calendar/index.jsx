import ReactCalendar from "react-calendar";

// const datesToAddClassTo = [tomorrow, in3Days, in5Days];

// function tileClassName({ date, view }) {
//   if (view === "month") {
//     if (datesToAddClassTo.find((dDate) => isSameDay(dDate, date))) {
//       return "myClassName";
//     }
//   }
// }

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
