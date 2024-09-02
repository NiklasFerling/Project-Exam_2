import { useEffect, useState } from "react";
import HighlightedDatesCalendar from "../../components/Calendar";

function Venue() {
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
          className="bg-green-300 w-96"
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
          <p className="mb-5">{venue.price}/night</p>
          <form className="flex gap-2 mb-5">
            <input type="date" className="border border-black rounded-xl p-1" />
            <p>-</p>
            <input type="date" className="border border-black rounded-xl p-1" />
            <button className="border border-black rounded-xl p-1">Book</button>
          </form>
          <span className="flex gap-2 items-center justify-center mb-2">
            <div className="h-4 w-4 bg-red-600 rounded-md"></div>
            <p>Not Available</p>
            <div className="h-4 w-4 bg-green-600 rounded-md ml-4"></div>
            <p>Available</p>
          </span>
          <HighlightedDatesCalendar />
        </div>
      </div>
    </div>
  );
}
export default Venue;
