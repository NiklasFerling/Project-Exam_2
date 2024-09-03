import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import BasicDateCalendar from "../../components/Calendar";

const schema = yup.object().shape({
  guests: yup.number().required("Guests is required"),
  dateFrom: yup.date().required("From is required"),
  dateTo: yup.date().required("To is required"),
});

const Venue = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function onBook(data) {
    console.log(data);
  }

  const [venue, setVenue] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function idFetch() {
      try {
        setLoading(true);
        const id = window.location.search.replace("?", "");
        const response = await fetch(
          `https://v2.api.noroff.dev/holidaze/venues/${id}?_owner=true&_bookings=true`
        );
        const data = await response.json();
        console.log(data);
        setVenue(data.data);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    idFetch();
  }, [setVenue]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="h-screen">
      <div className="flex justify-center gap-5 mt-20 bg-green-100/50 w-fit mx-auto border border-green-200 rounded-xl overflow-hidden">
        <img
          src={venue.media[0].url}
          alt={venue.media[0].alt}
          className="bg-green-300 w-96 object-cover"
        />
        <div className="p-5">
          <h1 className="text-3xl mb-4">{venue.name}</h1>
          <span className="flex mb-5 items-center">
            <i className="fa-solid fa-star mr-1"></i>
            <p className="mr-4">{venue.rating}</p>
            <p>
              {venue.location.city}, {venue.location.country}
            </p>
          </span>
          <span className="flex mb-5 gap-3">
            <p className="text-xl text-center">{venue.price}kr/night</p>|
            <p className="text-base">Max Capacity: 10</p>
          </span>
          <form className="mb-5 justify-center" onSubmit={handleSubmit(onBook)}>
            <span className="flex justify-between mb-2">
              <input
                {...register("dateFrom")}
                type="date"
                className="border border-black rounded-xl p-1 w-32"
              />
              <p className="align-middle">to</p>
              <input
                {...register("dateTo")}
                type="date"
                className="border border-black rounded-xl p-1 w-32"
              />
              <input
                type="number"
                {...register("guests")}
                className="border border-black rounded-xl p-1 w-10 text-center"
              />
            </span>
            <button className="border border-black rounded-xl p-1 mx-auto">
              Book
            </button>
          </form>
          <span className="flex gap-2 items-center justify-center mb-2">
            <p>❌</p>
            <p>Not Available</p>
          </span>
          <BasicDateCalendar />
        </div>
      </div>
    </div>
  );
};
export default Venue;
