import { load } from "../../storage/load";

export async function fetchBookings() {
  const profile = load("profile");
  const apiKey = load("API_KEY");

  const options = {
    headers: {
      Authorization: `Bearer ${profile.accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
  };

  const response = await fetch(
    "https://v2.api.noroff.dev/holidaze/bookings?_owner=true&_limit=100&_customer=false&_venue=true",
    options
  );
  const data = await response.json();
  return data;
}
