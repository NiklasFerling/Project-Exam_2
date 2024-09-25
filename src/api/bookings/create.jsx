import { load } from "../../storage/load";

export async function createBooking(data) {
  const profile = load("profile");
  const apiKey = load("API_KEY");
  try {
    const response = await fetch(
      "https://v2.api.noroff.dev/holidaze/bookings",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${profile.accessToken}`,
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify(data),
      }
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}
