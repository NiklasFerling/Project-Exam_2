import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { isSameDay, set } from "date-fns";
import { load } from "../../storage/load";

const datesToAddClassTo = ["2024-09-07", "2024-09-14", "2024-09-21"];

function MyCalendar(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [bookedDates, setBookedDates] = useState([]);

  function tileClassName({ date, view }) {
    if (view === "month") {
      if (bookedDates.find((dDate) => isSameDay(dDate, date))) {
        return "bg-red-200";
      }
    }
  }

  function getBookedDates(booking) {
    const startDate = new Date(booking.dateFrom);
    const endDate = new Date(booking.dateTo);

    const daysDiff = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));

    const bookedDates = Array.from(
      { length: daysDiff + 1 },
      (_, i) => new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000)
    );

    return bookedDates;
  }

  async function fetchBookings() {
    const url = `https://v2.api.noroff.dev/holidaze/bookings?_owner=true&_limit=100${props.id}?_customer=false&_venue=true`;
    const profile = load("profile");
    const apiKey = load("API_KEY");

    const options = {
      headers: {
        Authorization: `Bearer ${profile.accessToken}`,
        "X-Noroff-API-Key": apiKey,
      },
    };

    try {
      setIsLoading(true);
      const response = await fetch(url, options);
      const data = await response.json();
      const relevantBookings = data.data.filter(
        (booking) => booking.venue.id === props.id
      );

      const bookedDatesArray = relevantBookings.flatMap(getBookedDates);
      setBookedDates(bookedDatesArray);

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError(true);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="flex justify-center">
      <Calendar tileClassName={tileClassName} className="drop-shadow-2xl" />
    </div>
  );
}
export default MyCalendar;
