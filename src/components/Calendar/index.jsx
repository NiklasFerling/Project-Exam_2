import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { load } from "../../storage/load";

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function fakeFetch(date, { signal }) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = date.daysInMonth();
      const daysToHighlight = [1, 2, 3].map(() =>
        getRandomNumber(1, daysInMonth)
      );

      resolve({ daysToHighlight });
    }, 100);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException("aborted", "AbortError"));
    };
  });
}

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? "❌" : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

export default function DateCalendarServerRequest(props) {
  const requestAbortController = useRef(null);
  const [highlightedDays, setHighlightedDays] = useState([19, 2, 15]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [month, setMonth] = useState(0);

  useEffect(() => {
    fetchBookings();
  }, []);
  async function fetchBookings() {
    const url =
      "https://v2.api.noroff.dev/holidaze/bookings?_owner=true&_limit=100" +
      props.id +
      "?_customer=false&_venue=true";
    const profile = load("profile");
    const apiKey = load("API_KEY");
    load;
    const options = {
      headers: {
        Authorization: `Bearer ${profile.accessToken}`,
        "X-Noroff-API-Key": apiKey,
      },
    };

    try {
      setIsLoading(true);
      console.log(props.id);

      const response = await fetch(url, options);
      const data = await response.json();
      const relevantBookings = data.data.filter(
        (booking) => booking.venue.id === props.id
      );
      relevantBookings.forEach((booking) => {
        console.log(booking);
        const originalDate = new Date(booking.dateFrom);
        const formattedDate = originalDate.toISOString().split("T")[0];
        console.log(formattedDate);

        // setBookings((prevBookings) => [...prevBookings, booking]);
      });
      console.log(data.data);
    } catch (error) {
      console.log(error);
      setError(true);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  const handleMonthChange = (date) => {
    setMonth(date.$M + 1);

    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        loading={isLoading}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays,
          },
        }}
      />
    </LocalizationProvider>
  );
}
