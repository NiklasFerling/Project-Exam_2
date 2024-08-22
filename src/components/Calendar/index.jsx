import ReactCalendar from "react-calendar";

function Calendar() {
  return (
    <div>
      <ReactCalendar
        minDate={new Date()}
        view="month"
        onClickDay={(date) => console.log(date)}
      />
    </div>
  );
}
export default Calendar;
