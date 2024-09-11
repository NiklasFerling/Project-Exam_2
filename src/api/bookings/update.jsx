import { load } from "../../storage/load";

export async function updateBooking(booking, id) {
  const apiKey = load("API_KEY");
  const token = load("accessToken");

  try {
    const response = await fetch(
      "https://v2.api.noroff.dev/holidaze/bookings/" + id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify(booking),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}
