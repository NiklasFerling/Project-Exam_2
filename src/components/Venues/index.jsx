import { useState, useContext, useEffect } from "react";
import { VenuesContext } from "../../contexts/venuesContext";
import VenueCard from "../VenueCard";
import { TailSpin } from "react-loader-spinner";

function Venues({ url }) {
  const { venues, setVenues } = useContext(VenuesContext);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  async function fetchVenues() {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setLoading(false);
      setError(false);
      return data;
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchVenues().then((data) => {
      const filteredVenues = data.data.filter(
        (venue) => venue.media.length > 0
      );
      setVenues(filteredVenues);
    });
  }, [setVenues]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <TailSpin color="rgb(74 222 128)" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center text-neutral-600">Something went wrong</div>
    );
  }
  if (!error && venues.length === 0) {
    return <p className="text-center text-neutral-600">No venues found</p>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 max-w-7xl mx-auto">
      {venues.map((venue) => (
        <VenueCard key={venue.id} venue={venue} />
      ))}
    </div>
  );
}
export default Venues;
