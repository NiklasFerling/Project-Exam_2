import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MyCalendar from "../../components/ReactCalendar";
import { createBooking } from "../../api/bookings/create";
import { TailSpin } from "react-loader-spinner";
import { set } from "date-fns";

const id = window.location.search.replace("?", "");

function Venue() {
  const [venue, setVenue] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState(false);
  const [maxGuests, setMaxGuests] = useState(1);

  const schema = yup.object().shape({
    guests: yup
      .number("Please enter the number of guests")
      .min(1, "Please enter a number")
      .max(maxGuests, "Capacity for this venue is set at " + maxGuests)
      .required("Please enter the number of guests"),
    dateFrom: yup.date().required("Please select a from date"),
    dateTo: yup.date().required("Please selct a to date"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function onBook(data) {
    const id = window.location.search.replace("?", "");

    createBooking({ ...data, venueId: id }).then((json) => {
      if (json.data) {
        setBookingSuccess("Booking Successful");
      } else {
        console.log(json.errors[0].message);
        setBookingSuccess(false);
        setBookingError(`Booking Failed: ${json.errors[0].message}`);
      }
    });
  }

  async function idFetch() {
    const id = window.location.search.replace("?", "");
    try {
      setLoading(true);
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/venues/${id}?_owner=true&_bookings=true`
      );
      const data = await response.json();

      setVenue(data.data);
      setMaxGuests(data.data.maxGuests);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    idFetch();
  }, [setVenue]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <TailSpin color="rgb(74 222 128)" />
      </div>
    );
  }
  if (error) {
    return <div>Error</div>;
  }
  return (
    <div className="min-h-screen mb-20">
      <div className="flex flex-col lg:flex-row justify-center gap-5 mt-10 mx-auto md:w-2/3 xl:max-w-2/3 xl:px-0">
        <img
          src={venue.media[0].url}
          alt={venue.media[0].alt}
          className="bg-green-300 object-cover max-h-96 lg-max-h-full lg:aspect-square"
        />
        <div className="p-5 mx-10 md:mx-0 flex flex-col gap-5 justify-center">
          <div>
            <h1 className="text-3xl mb-4">{venue.name}</h1>
            <span className="flex mb-5 items-center">
              <i className="fa-solid fa-star mr-1"></i>
              <p className="mr-4">{venue.rating}</p>
              <p>
                {venue.location.city}, {venue.location.country}
              </p>
            </span>
            <span className="flex mb-10 gap-3">
              <p className="text-xl text-center">{venue.price}kr/night</p>|
              <p className="text-base">Max Capacity: {maxGuests}</p>
            </span>
            <form
              className="my-5 justify-center  mt-5"
              onSubmit={handleSubmit(onBook)}
            >
              <span className="flex mb-6 gap-2 sm:flex-row justify-center items-center">
                <div className="rounded-xl py-2 px-4 drop-shadow-2xl bg-white">
                  <label htmlFor="dateFrom" className="mr-2">
                    from:
                  </label>
                  <input
                    {...register("dateFrom")}
                    type="date"
                    className="focus:outline-none"
                  />
                </div>
                <p className="align-middle">-</p>
                <div className="rounded-xl py-2 px-4 drop-shadow-2xl bg-white">
                  <label htmlFor="dateTo" className="mr-2">
                    to:
                  </label>
                  <input
                    {...register("dateTo")}
                    type="date"
                    className="focus:outline-none"
                  />
                </div>
              </span>
              <span className="flex justify-center mb-2 gap-5">
                <div className="rounded-xl py-2 px-4 drop-shadow-2xl bg-white">
                  <label htmlFor="guests" className="mr-2">
                    guests:
                  </label>
                  <input
                    type="number"
                    {...register("guests")}
                    className="w-10 focus:outline-none"
                  />
                </div>
                <button className="rounded-xl py-2 px-6 drop-shadow-2xl bg-teal-500 text-white">
                  Book Now
                </button>
              </span>
              <p>{errors.guests?.message}</p>
              <p>{errors.dateFrom?.message}</p>
              <p>{errors.dateTo?.message}</p>
              {bookingError ? (
                <p className="text-red-500 text-center mt-5">{bookingError}</p>
              ) : null}
              {bookingSuccess ? (
                <p className="text-green-500 text-center mt-5">
                  {bookingSuccess}
                </p>
              ) : null}
            </form>
          </div>
          <div>
            <span className="flex gap-2 items-center justify-center mb-2">
              <div className="w-4 h-4 rounded-md bg-red-400"></div>
              <p>Not Available</p>
              <div className="w-4 h-4 rounded-md bg-green-300 ml-3"></div>
              <p>Today</p>
            </span>
            <MyCalendar id={venue.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Venue;
