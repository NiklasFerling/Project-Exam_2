import { useState, useContext, useEffect } from "react";
import { VenuesContext } from "../../contexts/venuesContext";
import VenueCard from "../VenueCard";

function Venues() {
  const { venues, setVenues } = useContext(VenuesContext);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVenues() {
      try {
        const response = await fetch(
          "https://v2.api.noroff.dev/holidaze/venues"
        );
        const data = await response.json();
        console.log(data.data);

        setVenues(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    fetchVenues();
  }, [setVenues]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Something went wrong</div>;
  }
  if (venues.data.length === 0) {
    return <p className="text-white text-center">No posts found</p>;
  }

  return (
    <div className="flex flex-wrap justify-between max-w-7xl mx-auto">
      {venues.data.map((venue) => (
        <VenueCard key={venue.id} venue={venue} />
      ))}
    </div>
  );
}
export default Venues;
