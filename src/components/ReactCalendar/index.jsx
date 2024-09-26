import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { isSameDay } from "date-fns";
import { load } from "../../storage/load";

// Calendar imported from react-calendar used to display unavailable dates for a specific venue
// Used in venue page

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
      setError(false);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError("Error fetching bookings");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      {error && <p className="text-red-500">{error}</p>}
      <Calendar tileClassName={tileClassName} className="drop-shadow-2xl" />
    </div>
  );
}
export default MyCalendar;
