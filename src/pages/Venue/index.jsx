import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MyCalendar from "../../components/ReactCalendar";
import { createBooking } from "../../api/bookings/create";
import { TailSpin } from "react-loader-spinner";
import { load } from "../../storage/load";
import VenueForm from "../../components/VenueForm";
import ManagerBookingCard from "../../components/ManagerBookingCard";

const profile = load("profile");
const id = window.location.search.replace("?", "");

function Venue() {
  const [venue, setVenue] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState(false);
  const [maxGuests, setMaxGuests] = useState(1);
  const [isManager, setIsManager] = useState(false);
  const [bookings, setBookings] = useState([]);

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
      console.log(data.data.bookings[0]);
      if (data.data.owner.name === profile.name) {
        setIsManager(true);
      }
      setVenue(data.data);
      setBookings(data.data.bookings);
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
      <div className="flex flex-col justify-center gap-2 mt-10 mx-auto max-w-2xl">
        <h1 className="text-3xl mb-8 text-center">{venue.name}</h1>
        <img
          src={venue.media[0].url}
          alt={venue.media[0].alt}
          className="bg-green-300 object-cover max-h-96 lg-max-h-full lg:aspect-square"
        />
        <div className="p-5 mx-10 md:mx-0 flex flex-col gap-5 justify-center">
          <div>
            {!isManager && (
              <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                <div className="flex flex-col mb-10 md:mb-0">
                  <span className="flex mb-5 items-center">
                    <i className="fa-solid fa-star mr-1"></i>
                    <p className="mr-4">{venue.rating}</p>
                    <p>
                      {venue.location.city}, {venue.location.country}
                    </p>
                  </span>
                  <span className="flex gap-3 text-neutral-500 items-center justify-center">
                    {venue.meta.wifi && (
                      <i className="fa-solid fa-wifi text-lg"></i>
                    )}
                    {venue.meta.parking && (
                      <i className="fa-solid fa-car text-lg"></i>
                    )}
                    {venue.meta.breakfast && (
                      <i className="fa-solid fa-coffee text-lg"></i>
                    )}
                    {venue.meta.pets && (
                      <i className="fa-solid fa-dog text-lg"></i>
                    )}
                    <p>|</p>
                    <p>Max Capacity: {maxGuests}</p>
                  </span>
                </div>
                <p className="text-2xl">{venue.price}kr/night</p>
              </div>
            )}
            {!isManager && (
              <form
                className="my-5 justify-center  mt-5"
                onSubmit={handleSubmit(onBook)}
              >
                <span className="flex mb-6 gap-2 sm:flex-row justify-center items-center">
                  <div className="flex flex-col rounded-xl py-2 px-4 drop-shadow-2xl bg-white">
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
                  <div className="flex flex-col rounded-xl py-2 px-4 drop-shadow-2xl bg-white">
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
                  <div className="rounded-xl py-2 px-4 drop-shadow-2xl bg-white w-32">
                    <label htmlFor="guests" className="mr-2">
                      guests:
                    </label>
                    <input
                      type="number"
                      {...register("guests")}
                      className="focus:outline-none w-8"
                    />
                  </div>
                  <button className="rounded-xl py-2 px-6 drop-shadow-2xl bg-teal-500 text-white w-32">
                    Book Now
                  </button>
                </span>
                <p>{errors.guests?.message}</p>
                <p>{errors.dateFrom?.message}</p>
                <p>{errors.dateTo?.message}</p>
                {bookingError ? (
                  <p className="text-red-500 text-center mt-5">
                    {bookingError}
                  </p>
                ) : null}
                {bookingSuccess ? (
                  <p className="text-green-500 text-center mt-5">
                    {bookingSuccess}
                  </p>
                ) : null}
              </form>
            )}
          </div>
          {isManager && (
            <>
              <h3 className="text-xl text-center my-3">
                Bookings ({bookings.length})
              </h3>
              <div>
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <ManagerBookingCard key={booking.id} booking={booking} />
                  ))
                ) : (
                  <p className="text-center text-neutral-600">
                    No bookings yet
                  </p>
                )}
              </div>
            </>
          )}
          <div>
            <span className="flex gap-2 items-center justify-center mb-2">
              <div className="w-4 h-4 rounded-md bg-red-400"></div>
              <p>Not Available</p>
            </span>
            <MyCalendar id={venue.id} />
          </div>
          {!isManager && (
            <div>
              <h3 className="text-xl my-3">Venue Description</h3>
              <p>{venue.description}</p>
            </div>
          )}
        </div>
      </div>
      {isManager && (
        <div>
          <h3 className="text-center text-xl mt-16 mb-8">Update Venue</h3>
          <VenueForm method="PUT" venue={venue} />
        </div>
      )}
    </div>
  );
}
export default Venue;
