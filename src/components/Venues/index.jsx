import { useState, useContext, useEffect } from "react";
import { VenuesContext } from "../../contexts/venuesContext";
import VenueCard from "../VenueCard";
import { TailSpin } from "react-loader-spinner";

function Venues({ url }) {
  const { venues, setVenues } = useContext(VenuesContext);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  console.log(url);

  async function fetchVenues() {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setLoading(false);
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
    return <div>Something went wrong</div>;
  }
  if (venues.length === 0) {
    return <p className="text-white text-center">No posts found</p>;
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
