import { useEffect, useState } from "react";
import { load } from "../../storage/load";
import YourVenuesCard from "../YourVenuesCard";

// Displays a list of all venues you own
// Is used in the profile page under "Manage Venues"

function YourVenues() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [venues, setVenues] = useState([]);

  async function fetchVenues() {
    const profile = load("profile");
    const apiKey = load("API_KEY");
    const url =
      "https://v2.api.noroff.dev/holidaze/profiles/" + profile.name + "/venues";
    const options = {
      headers: {
        Authorization: `Bearer ${profile.accessToken}`,
        "X-Noroff-API-Key": apiKey,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (data.data) {
        setLoading(false);
        return data;
      }
    } catch (err) {
      console.log(err);
      setError(true);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchVenues().then((data) => {
      setVenues(data.data);
    });
  }, []);

  return (
    <div className="max-w-3xl m-auto">
      <h3 className="text-center text-xl mt-16 mb-8">
        Your Venues ({venues.length})
      </h3>
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : error ? (
        <div>Error</div>
      ) : (
        <>
          {venues.map((venue) => (
            <YourVenuesCard key={venue.id} venue={venue} />
          ))}
        </>
      )}
    </div>
  );
}
export default YourVenues;
